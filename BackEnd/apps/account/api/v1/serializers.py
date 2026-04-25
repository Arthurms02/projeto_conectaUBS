from rest_framework import serializers
from apps.account.models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):

    senha = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'telefone', 'cpf']
        extra_kwargs = {
            'senha': {'write_only': True},
        }

    def validate(self, data):
        if data['senha'] != data['confirmacao_senha']:
            raise serializers.ValidationError("As senhas não coincidem.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirmacao_senha')
        user = Usuario.objects.create_user(**validated_data)
        return user