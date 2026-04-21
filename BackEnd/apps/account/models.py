from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

from BackEnd.apps.account.manage import ActiveManager


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True

    objects = ActiveManager()
    all_objects = models.Manager()

    def delete(self, using=None, keep_parents=False):
        self.deleted_at = timezone.now()
        self.save(using=using)

    def restore(self, using=None, keep_parents=False):
        self.deleted_at = None
        self.save(using=using)

class Usuario(AbstractUser, BaseModel):

    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    cpf = models.CharField(max_length=14, unique=True)
    senha = models.CharField(max_length=128)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome', 'cpf', 'email', 'senha']


    def create_user(self, nome, email, telefone, cpf, senha):
        user = self.model(
            nome=nome,
            email=email,
            telefone=telefone,
            cpf=cpf,
        )
        user.set_password(senha)
        user.save(using=self._db)
        return user

    def __str__(self):
        return self.email