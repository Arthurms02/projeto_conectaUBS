from rest_framework import viewsets, status
from apps.account.models import Usuario
from .serializers import UsuarioSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated


class UsuarioViewSet(viewsets.GenericViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UsuarioSerializer(user, context=self.get_serializer_context()).data,
            "message": "Usuário criado com sucesso."
        }, status=status.HTTP_201_CREATED)

    def get_permissions(self):
        # Apenas a action 'register' é pública
        if self.action == 'register':
            return [AllowAny()]
        return [IsAuthenticated()]
