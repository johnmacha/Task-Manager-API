from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register(r'plan', TaskViewSet, basename='plan')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name = 'register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

   ]