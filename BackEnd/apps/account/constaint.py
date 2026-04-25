from django.db import models

class Role(models.TextChoices):
        AGENTE_SAUDE = 'agente_saude', 'Agente de Saúde'
        AGENTE_ENDEMIAS = 'agente_endemias', 'Agente de Endemias'