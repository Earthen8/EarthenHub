from rest_framework import serializers
from .models import Discipline, Project, Experience, Tool, Philosophy, PhilosophyTrait, Inquiry

class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ['id', 'index', 'label', 'slug', 'icon', 'description', 'stack', 'accent_color', 'sort_order']

class ProjectSerializer(serializers.ModelSerializer):
    discipline = DisciplineSerializer(read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'discipline', 'challenge', 'approach', 'outcome_metrics', 'technology_tags', 'image_url', 'image', 'sort_order', 'is_featured']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'title', 'organization', 'description', 'start_date', 'end_date', 'is_present', 'type']

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
    
    class Meta:
        model = Philosophy
        fields = ['id', 'name', 'professional_titles', 'philosophy_text', 'traits']

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['name', 'email', 'message']
