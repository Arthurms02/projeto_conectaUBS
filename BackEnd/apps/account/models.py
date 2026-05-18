from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser

from core import settings
from apps.account.manage import ActiveManager, UsuarioManager
from apps.account.constaint import Role
from django.contrib.auth.models import PermissionsMixin

from django.contrib.gis.db import models


class BaseModel(models.Model):

    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = ActiveManager()
    all_objects = models.Manager()

    def delete(self, using=None, keep_parents=False):
        self.deleted_at = timezone.now()
        self.save(using=using)

    def restore(self, using=None, keep_parents=False):
        self.deleted_at = None
        self.save(using=using)



class Usuario(AbstractBaseUser, PermissionsMixin, BaseModel):

    role = models.CharField(max_length=20, choices=Role.choices)
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    cpf = models.CharField(max_length=14, unique=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome', 'cpf']

    objects = UsuarioManager()
    all_objects = ActiveManager()

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = Role.ADMIN
            if Usuario.objects.filter(role=Role.ADMIN).exclude(id=self.id).exists():
                raise ValueError("Já existe um usuário com o papel de Admin.")
        elif self.role == Role.ADMIN:
            raise PermissionError("Não é permitido atribuir o papel de Admin diretamente.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email


class PerfilUBS(BaseModel):
    """
    Criado pelo super admin. Só nome e localizaçõa no momento da criação.
    O agente responsével é vinculado depois por isso null=True, blank=True.
    """
    class Meta:
        verbose_name = 'Perfil UBS'
        verbose_name_plural = 'Perfis UBS'

    nome = models.CharField(max_length=255)
    endereco = models.CharField(max_length=255)
    agente_responsavel = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='ubs_responsavel', limit_choices_to={'role': 'agente_saude'})

    def __str__(self):
        return self.nome

class PerfilAgente(BaseModel):
    """
    Criado pelo super admin. Só nome e localizaçõa no momento da criação.
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='perfil_agente')
    coren = models.CharField(max_length=20, unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    especialidade = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.coren


# Teste GeoDjango


class Loja(models.Model):
    nome = models.CharField(max_length=100)
    # geography=True: diz ao PostGIS para calcular distâncias na esfera terrestre (metros)
    # spatial_index=True: Cria o índice GIST automaticamente no banco
    localizacao = models.PointField(geography=True, spatial_index=True)

    def __str__(self):
        return self.nome