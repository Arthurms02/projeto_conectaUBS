from rest_framework import viewsets, status, mixins ,permissions
from .serializers import UsuarioSerializer, LojaGeoSerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from apps.account.models import Loja



User = get_user_model()

class UsuarioViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UsuarioSerializer(user, context=self.get_serializer_context()).data,
            "message": "Usuário criado com sucesso."
        }, status=status.HTTP_201_CREATED)


class LojaGeoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Loja.objects.all()
    serializer_class = LojaGeoSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        # 1. Pegar os parâmetros da URL (ex: /api/lojas/?lat=-7.02&lng=-37.27&raio=10)
        lat = self.request.query_params.get('lat')
        lng = self.request.query_params.get('lng')
        raio_km = self.request.query_params.get('raio', 5) # Default 5km

        if not lat or not lng:
            return Loja.objects.none()

        # 2. Criar o ponto de referência.
        # ATENÇÃO: A ordem no GeoDjango é SEMPRE (Longitude, Latitude) -> (X, Y)
        # SRID 4326 é o padrão GPS (WGS84)
        ponto_referencia = Point(float(lng), float(lat), srid=4326)

        # 3. Realizar a consulta usando DWithin
        queryset = Loja.objects.filter(
            localizacao__dwithin=(ponto_referencia, D(km=float(raio_km)))
        )

        return queryset