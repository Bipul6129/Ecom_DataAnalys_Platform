from rest_framework import generics,status
from rest_framework.response import Response
from .models import MyUser
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class UserRegistrationView(APIView):

    def post(self,request,format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            password=make_password(serializer.validated_data['password'])
            serializer.validated_data['password']=password
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id':user.id,
                'username':user.username,
                'email':user.email,
                'role':user.role
                
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)