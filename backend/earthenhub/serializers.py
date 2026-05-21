from rest_framework import serializers
from .models import Discipline, Project, Experience, Tool, Philosophy, PhilosophyTrait, Inquiry, Certification

class DisciplineSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='slug')
    accentColor = serializers.CharField(source='accent_color')
    stack = serializers.SerializerMethodField()
    
    class Meta:
        model = Discipline
        fields = ['id', 'index', 'label', 'slug', 'icon', 'description', 'stack', 'accentColor', 'sort_order']

    def get_stack(self, obj):
        return obj.stack if isinstance(obj.stack, list) else []

class ProjectSerializer(serializers.ModelSerializer):
    tag = serializers.SerializerMethodField()
    problem = serializers.CharField(source='challenge', default="")
    solution = serializers.CharField(source='approach', default="")
    techStack = serializers.SerializerMethodField()
    outcome = serializers.SerializerMethodField()
    imageUrl = serializers.SerializerMethodField()
    link = serializers.URLField(source='external_link', allow_blank=True, allow_null=True, required=False)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'tag', 'problem', 'solution', 'techStack', 'outcome', 'imageUrl', 'sort_order', 'is_featured', 'link']

    def get_tag(self, obj):
        return obj.discipline.label if obj.discipline else "General"

    def get_techStack(self, obj):
        return obj.technology_tags if isinstance(obj.technology_tags, list) else []

    def get_outcome(self, obj):
        return obj.outcome_metrics if isinstance(obj.outcome_metrics, list) else []

    def get_imageUrl(self, obj):
        if obj.image_url:
            return obj.image_url
        if obj.image:
            return obj.image.url
        # Fallback to a safe placeholder if no image exists
        return "https://placehold.co/600x400/1a1a1a/ffffff?text=Project+Preview"

class ExperienceSerializer(serializers.ModelSerializer):
    year = serializers.SerializerMethodField()
    
    class Meta:
        model = Experience
        fields = ['id', 'year', 'title', 'organization', 'description', 'type']

    def get_year(self, obj):
        if obj.is_present:
            return "Present"
        try:
            return obj.start_date.strftime("%b %Y")
        except AttributeError:
            return "Unknown"

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
    philosophyText = serializers.CharField(source='philosophy_text', default="")
    
    class Meta:
        model = Philosophy
        fields = ['id', 'name', 'philosophyText', 'traits']

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['name', 'email', 'message']

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required.")
        return value


class CertificationSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='slug')
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = ['id', 'title', 'imageUrl', 'sort_order']

    def get_imageUrl(self, obj):
        if obj.image_url:
            return obj.image_url
        if obj.image:
            return obj.image.url
        return None

