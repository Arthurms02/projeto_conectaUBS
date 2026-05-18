from rest_framework import routers
from .viewsets import UsuarioViewSet, LojaGeoViewSet


router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'lojas', LojaGeoViewSet, basename='loja-geo')

urlpatterns = router.urls