from rest_framework import routers
from .viewsets import UsuarioViewSet


router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = router.urls