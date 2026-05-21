from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from earthenhub.models import Project, Discipline, Certification
from earthenhub.serializers import ProjectSerializer, CertificationSerializer

class ImageURLSerializationTest(TestCase):
    def setUp(self):
        self.discipline = Discipline.objects.create(
            index="01",
            label="Design",
            slug="design",
            icon="Pen",
            description="Design work"
        )
        
    def test_project_serializer_prioritizes_image_url(self):
        small_gif = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04'
            b'\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02'
            b'\x02\x4c\x01\x00\x3b'
        )
        image_file = SimpleUploadedFile("test_image.gif", small_gif, content_type="image/gif")
        
        project = Project.objects.create(
            title="Test Project",
            slug="test-project",
            discipline=self.discipline,
            image=image_file,
            image_url="https://cloudflare-r2.com/test_image.gif"
        )
        
        serializer = ProjectSerializer(project)
        self.assertEqual(serializer.data["imageUrl"], "https://cloudflare-r2.com/test_image.gif")

        project_only_image = Project.objects.create(
            title="Test Project 2",
            slug="test-project-2",
            discipline=self.discipline,
            image=image_file
        )
        serializer_only_image = ProjectSerializer(project_only_image)
        self.assertIn("test_image", serializer_only_image.data["imageUrl"])

    def test_certification_serializer_prioritizes_image_url(self):
        small_gif = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04'
            b'\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02'
            b'\x02\x4c\x01\x00\x3b'
        )
        image_file = SimpleUploadedFile("cert.gif", small_gif, content_type="image/gif")
        
        cert = Certification.objects.create(
            title="Test Cert",
            slug="test-cert",
            image=image_file,
            image_url="https://cloudflare-r2.com/cert.gif"
        )
        serializer = CertificationSerializer(cert)
        self.assertEqual(serializer.data["imageUrl"], "https://cloudflare-r2.com/cert.gif")
