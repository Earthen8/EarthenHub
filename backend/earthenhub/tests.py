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
        
    def test_project_serializer_image(self):
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
            image=image_file
        )
        
        serializer = ProjectSerializer(project)
        self.assertIn("test_image", serializer.data["imageUrl"])

    def test_project_serializer_fallback(self):
        project = Project.objects.create(
            title="Test Project No Image",
            slug="test-project-no-image",
            discipline=self.discipline
        )
        serializer = ProjectSerializer(project)
        self.assertEqual(serializer.data["imageUrl"], "https://placehold.co/600x400/1a1a1a/ffffff?text=Project+Preview")

    def test_certification_serializer_image(self):
        small_gif = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04'
            b'\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02'
            b'\x02\x4c\x01\x00\x3b'
        )
        image_file = SimpleUploadedFile("cert.gif", small_gif, content_type="image/gif")
        
        cert = Certification.objects.create(
            title="Test Cert",
            slug="test-cert",
            image=image_file
        )
        serializer = CertificationSerializer(cert)
        self.assertIn("cert", serializer.data["imageUrl"])

    def test_certification_serializer_fallback(self):
        cert = Certification.objects.create(
            title="Test Cert No Image",
            slug="test-cert-no-image"
        )
        serializer = CertificationSerializer(cert)
        self.assertIsNone(serializer.data["imageUrl"])
