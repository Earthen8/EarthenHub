from django.db import models
from django.contrib import admin
from .models import Discipline, Project, Experience, Tool, Philosophy, PhilosophyTrait, Inquiry, Certification

@admin.register(Discipline)
class DisciplineAdmin(admin.ModelAdmin):
    list_display = ('label', 'index', 'icon', 'sort_order')
    prepopulated_fields = {'slug': ('label',)}
    list_editable = ('sort_order', 'icon')
    search_fields = ('label',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'discipline', 'is_featured', 'sort_order')
    list_filter = ('discipline', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_featured', 'sort_order')
    search_fields = ('title', 'challenge')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'start_date', 'end_date', 'is_present', 'type')
    list_filter = ('type', 'is_present')
    list_editable = ('is_present',)
    search_fields = ('title', 'organization')
    ordering = ['-start_date']

@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'sort_order')
    list_filter = ('category', 'proficiency')
    list_editable = ('proficiency', 'sort_order')
    search_fields = ('name',)

class PhilosophyTraitInline(admin.TabularInline):
    model = PhilosophyTrait
    extra = 1

@admin.register(Philosophy)
class PhilosophyAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [PhilosophyTraitInline]

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'status', 'created_at')
    list_filter = ('status',)
    list_editable = ('status',)
    readonly_fields = ('name', 'email', 'message', 'created_at')
    search_fields = ('name', 'email', 'message')


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'sort_order')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('sort_order',)
    search_fields = ('title',)

