from rest_framework import serializers
from apps.account.constaint import Role
from apps.account.models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'telefone', 'cpf', 'password', 'role']
        read_only_fields = ['id']

    def validate_role(self, value):
        roles_permitidas = [Role.AGENTE_SAUDE, Role.AGENTE_ENDEMIAS]
        if value not in roles_permitidas:
            raise serializers.ValidationError("Role inválida.")
        return value

    def create(self, validated_data):
        user = Usuario.objects.create_user(**validated_data)
        return user


