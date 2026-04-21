from rest_framework import viewsets, status
from apps.account.models import Usuario
from .serializers import RegisterSerializer
from rest_framework.response import Response


class UsuarioViewSet(viewsets.GenericViewSet):
    queryset = Usuario.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": RegisterSerializer(user, context=self.get_serializer_context()).data,
            "message": "Usuário criado com sucesso."
        }, status=status.HTTP_201_CREATED)