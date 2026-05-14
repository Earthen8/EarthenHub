from django.db import models

# Create your models here.

class Discipline(models.Model):
    """Represents a category of work or skill ('My Worlds' in frontend)."""
    index = models.CharField(max_length=10, help_text="e.g., '01', '02'")
    label = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, help_text="Lucide icon name, e.g., 'Code2'")
    description = models.TextField()
    stack = models.JSONField(default=list, help_text="List of strings representing technologies")
    accent_color = models.CharField(max_length=20, help_text="Hex code, e.g., '#6ee7b7'")
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return self.label


class Project(models.Model):
    """Portfolio case studies."""
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    discipline = models.ForeignKey(Discipline, on_delete=models.SET_NULL, null=True, related_name='projects')
    challenge = models.TextField()
    approach = models.TextField()
    outcome_metrics = models.JSONField(default=list, help_text="List of strings, e.g., ['99.9% uptime', '300ms avg response']")
    technology_tags = models.JSONField(default=list, help_text="List of strings representing tech stack")
    image_url = models.URLField(blank=True, null=True, help_text="URL to the project image")
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    sort_order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', '-id']

    def __str__(self):
        return self.title


class Experience(models.Model):
    """Timeline and milestones."""
    TYPE_CHOICES = [
        ('education', 'Education'),
        ('work', 'Work'),
        ('achievement', 'Achievement'),
        ('project', 'Project'),
    ]

    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_present = models.BooleanField(default=False)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.title} at {self.organization}"


class Tool(models.Model):
    """Technical inventory and physical gear."""
    CATEGORY_CHOICES = [
        ('dev', 'Development'),
        ('infra', 'Infrastructure'),
        ('design', 'Design'),
        ('hardware', 'Hardware'),
    ]
    
    PROFICIENCY_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=50, help_text="Lucide icon name")
    description = models.TextField()
    proficiency = models.CharField(max_length=20, choices=PROFICIENCY_CHOICES, blank=True, null=True)
    
    # Hardware specific fields
    specifications = models.CharField(max_length=200, blank=True, null=True, help_text="e.g., Ryzen 7 8840HS")
    frame_count = models.PositiveIntegerField(blank=True, null=True, help_text="For cameras only")
    
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name


class Philosophy(models.Model):
    """About Me singleton."""
    name = models.CharField(max_length=100, default="Earthen")
    professional_titles = models.CharField(max_length=200, help_text="Comma-separated titles")
    philosophy_text = models.TextField()

    class Meta:
        verbose_name_plural = "Philosophies"

    def __str__(self):
        return "My Philosophy"
        
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if Philosophy.objects.exists() and not self.pk:
            return Philosophy.objects.first()
        return super().save(*args, **kwargs)


class PhilosophyTrait(models.Model):
    """Core traits shown in the About section."""
    philosophy = models.ForeignKey(Philosophy, on_delete=models.CASCADE, related_name='traits')
    icon = models.CharField(max_length=50, help_text="Lucide icon name")
    title = models.CharField(max_length=100)
    description = models.TextField()
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return self.title


class Inquiry(models.Model):
    """Lead management for contact form."""
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('responded', 'Responded'),
        ('archived', 'Archived'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Inquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.status})"
