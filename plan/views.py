from django.shortcuts import render
from rest_framework import viewsets, permissions, filters, generics
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer 
from django_filters.rest_framework import DjangoFilterBackend
from .models import Task
from .filters import TaskFilter
from .serializers import TaskSerializer

# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    # Filtering fields
    filterset_class = TaskFilter

    #Search fields
    search_fields = ['title', 'description']

    #Optional ordering
    ordering_fields = ['due_date', 'created_at']

    def get_queryset(self):
        #Return only the task of the logged-in user
        return Task.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        #Automatically assign the logged-in user when creating a new task
        serializer.save(user=self.request.user) 

class RegisterSerializer (ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]