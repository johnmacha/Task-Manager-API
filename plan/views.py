from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
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
        #Automatically assign the logged-in user when craeating a new task
        serializer.save(user=self.request.user) 
