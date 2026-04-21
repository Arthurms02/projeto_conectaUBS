from rest_framework import routers
from .viewsets import UsarioViewSet


router = routers.DefaultRouter()
router.register(r'usuarios', UsarioViewSet, basename='usuario')