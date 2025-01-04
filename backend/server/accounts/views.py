from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate

class GoogleLoginAPIView(APIView):
    def post(self, request):
        email = request.data.get("email")
        name = request.data.get("name")
        image = request.data.get("image")

        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user already exists
        user, created = User.objects.get_or_create(email=email)
        if created:
            user.username = email.split("@")[0]
            user.first_name = name.split(" ")[0]
            user.last_name = " ".join(name.split(" ")[1:])
            user.save()

        return Response({"message": "User saved successfully"}, status=status.HTTP_200_OK)
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            # Get user by email
            user = User.objects.get(email=email)
            # Authenticate using username (as Django defaults to username-based authentication)
            user = authenticate(username=user.username, password=password)

            if user is not None:
                return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"message": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)



