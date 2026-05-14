from rest_framework import serializers
from .models import Discipline, Project, Experience, Tool, Philosophy, PhilosophyTrait, Inquiry

class DisciplineSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='slug')
    accentColor = serializers.CharField(source='accent_color')
    
    class Meta:
        model = Discipline
        fields = ['id', 'index', 'label', 'slug', 'icon', 'description', 'stack', 'accentColor', 'sort_order']

class ProjectSerializer(serializers.ModelSerializer):
    tag = serializers.CharField(source='discipline.label', read_only=True)
    problem = serializers.CharField(source='challenge')
    solution = serializers.CharField(source='approach')
    techStack = serializers.JSONField(source='technology_tags')
    outcome = serializers.JSONField(source='outcome_metrics')
    imageUrl = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'tag', 'problem', 'solution', 'techStack', 'outcome', 'imageUrl', 'sort_order', 'is_featured']

    def get_imageUrl(self, obj):
        if obj.image:
            return obj.image.url
        return obj.image_url

class ExperienceSerializer(serializers.ModelSerializer):
    year = serializers.SerializerMethodField()
    
    class Meta:
        model = Experience
        fields = ['id', 'year', 'title', 'organization', 'description', 'type']

    def get_year(self, obj):
        if obj.is_present:
            return "Present"
        return obj.start_date.strftime("%b %Y")

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ['id', 'name', 'category', 'icon', 'description', 'proficiency', 'specifications', 'frame_count', 'sort_order']

class PhilosophyTraitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhilosophyTrait
        fields = ['id', 'icon', 'title', 'description', 'sort_order']

class PhilosophySerializer(serializers.ModelSerializer):
    traits = PhilosophyTraitSerializer(many=True, read_only=True)
    professionalTitles = serializers.CharField(source='professional_titles')
    philosophyText = serializers.CharField(source='philosophy_text')
    
    class Meta:
        model = Philosophy
        fields = ['id', 'name', 'professionalTitles', 'philosophyText', 'traits']

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['name', 'email', 'message']
