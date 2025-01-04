from django.urls import path
from .views import RegisterView, LoginView , GoogleLoginAPIView
# from .views import GoogleLoginAPIView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path("api/accounts/google-login/", GoogleLoginAPIView.as_view(), name="google-login"),
]
