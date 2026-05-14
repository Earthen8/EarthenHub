from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Discipline, Project, Experience, Tool, Philosophy, Inquiry
from .serializers import (
    DisciplineSerializer,
    ProjectSerializer,
    ExperienceSerializer,
    ToolSerializer,
    PhilosophySerializer,
    InquirySerializer
)

class DisciplineViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows disciplines to be viewed.
    """
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer
    lookup_field = 'slug'

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows projects to be viewed.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Project.objects.all()
        featured = self.request.query_params.get('featured', None)
        if featured is not None:
            is_featured = featured.lower() in ['true', '1', 'yes']
            queryset = queryset.filter(is_featured=is_featured)
        return queryset

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows experiences to be viewed.
    """
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ToolViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows tools/hardware to be viewed.
    """
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer

class PhilosophyViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    """
    API endpoint to retrieve the singleton philosophy.
    """
    serializer_class = PhilosophySerializer
    
    def get_queryset(self):
        return Philosophy.objects.all()
        
    def list(self, request, *args, **kwargs):
        instance = Philosophy.objects.first()
        if instance:
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        return Response({})

class InquiryViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    API endpoint to submit inquiries (contact form).
    """
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
