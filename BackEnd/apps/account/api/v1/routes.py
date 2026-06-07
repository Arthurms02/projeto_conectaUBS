from rest_framework.routers import DefaultRouter

from .viewsets import UsuarioViewSet, LojaGeoViewSet, CurrentUserViewSet


router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'lojas', LojaGeoViewSet, basename='loja-geo')
router.register(r'me/', CurrentUserViewSet, basename='refresh')

urlpatterns = router.urls
