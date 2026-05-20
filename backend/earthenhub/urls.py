from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter(trailing_slash=False)
router.register(r'disciplines', views.DisciplineViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'experiences', views.ExperienceViewSet)
router.register(r'tools', views.ToolViewSet)
router.register(r'philosophy', views.PhilosophyViewSet, basename='philosophy')
router.register(r'inquiries', views.InquiryViewSet)
router.register(r'certifications', views.CertificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
