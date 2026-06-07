from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenVerifyView

from core.auth_views import CookieTokenLogoutView, CookieTokenObtainPairView, CookieTokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.account.api.v1.routes')),
    path('api/token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/logout/', CookieTokenLogoutView.as_view(), name='token_logout'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
