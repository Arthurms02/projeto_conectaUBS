from django.conf import settings
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


ACCESS_COOKIE_NAME = "access_token"
REFRESH_COOKIE_NAME = "refresh_token"


def _set_auth_cookies(response: Response, access_token: str, refresh_token: str | None = None) -> None:
    cookie_options = {
        "httponly": True,
        "secure": settings.SECURE_COOKIE,
        "samesite": "Lax",
        "path": "/",
    }

    response.set_cookie(ACCESS_COOKIE_NAME, access_token, max_age=60 * 60, **cookie_options)

    if refresh_token is not None:
        response.set_cookie(REFRESH_COOKIE_NAME, refresh_token, max_age=60 * 60 * 24 * 7, **cookie_options)


class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        _set_auth_cookies(response, response.data["access"], response.data["refresh"])
        response.data = {"detail": "Autenticado com sucesso."}
        return response


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(REFRESH_COOKIE_NAME)
        if not refresh_token:
            return Response({"detail": "Refresh token ausente."}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data={"refresh": refresh_token})
        serializer.is_valid(raise_exception=True)

        response = Response(serializer.validated_data, status=status.HTTP_200_OK)
        _set_auth_cookies(response, serializer.validated_data["access"], refresh_token)
        return response


class CookieTokenLogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        response = Response({"detail": "Logout realizado com sucesso."}, status=status.HTTP_200_OK)
        response.delete_cookie(ACCESS_COOKIE_NAME, path="/")
        response.delete_cookie(REFRESH_COOKIE_NAME, path="/")
        return response
