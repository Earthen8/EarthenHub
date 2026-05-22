# EarthenHub Backend API

This is the backend API for my personal portfolio website, built using **Django 5.2** and **Django REST Framework (DRF)**.

The backend serves portfolio content (disciplines, projects, experiences, tools, certifications, and philosophy) and handles DB persistence for incoming contact inquiries.

---

## API Endpoints

All API endpoints are prefixed with `/api`. The router is configured with `trailing_slash=False` to match Next.js proxy behavior without redirects.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /api/disciplines` | `GET` | List all professional disciplines |
| `GET /api/projects` | `GET` | List portfolio projects (Filter with `?featured=true`) |
| `GET /api/experiences` | `GET` | List professional timeline experiences |
| `GET /api/tools` | `GET` | List technical tools and proficiencies |
| `GET /api/philosophy` | `GET` | Retrieve the singleton philosophy model |
| `GET /api/certifications` | `GET` | List professional certifications |
| `POST /api/inquiries` | `POST` | Submit a new contact form inquiry |
| `GET /api/admin/` | `GET` | Access Django Admin Panel (Requires superuser) |

---

## Technical Stack & Libraries

* **Django 5.2**: The core MVC web framework.
* **Django REST Framework (DRF)**: Serves standard JSON endpoints.
* **Django CORS Headers**: Enables CORS protection (allowing frontend connections).
* **django-storages[boto3]**: Integrates Cloudflare R2 S3-compatible cloud storage.
* **SQLite / PostgreSQL**: Database used for local development (`db.sqlite3`) and production.

---

## Configuration & Environment Variables

Create a `.env` file in the root of the `backend/` directory to configure the environment (see `backend/.env.example` for details):

```env
# Enable/Disable Django Debug Mode (True for local development, False for production)
DEBUG=True

# Secret key used for cryptographic signing
SECRET_KEY=django-insecure-some-secret-key-here

# Database URL connection string
DATABASE_URL=postgres://user:password@localhost:5432/dbname

# Cloudflare R2 Settings (Set USE_CLOUDFLARE_R2 to True to enable cloud storage)
USE_CLOUDFLARE_R2=False
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=your-r2-bucket-name
R2_ENDPOINT_URL=https://your-account-id.r2.cloudflarestorage.com
```

### Media Storage Engine

The backend dynamically selects the storage backend based on environment flags:
* **Local Development (`USE_CLOUDFLARE_R2=False` or unset)**: Django uses `FileSystemStorage` to save uploaded images to the local `media/` folder.
* **Production (`USE_CLOUDFLARE_R2=True`)**: Django uses `storages.backends.s3.S3Storage` to stream uploaded files directly to Cloudflare R2 using the S3-compatible API protocol. All uploaded items are stored remotely, and no local disk storage is utilized on the host server.


---

## Django Administration

To manage portfolio content or review contact form submissions:
1. Start the server (`python manage.py runserver`).
2. Navigate to `http://127.0.0.1:8000/api/admin/` in your browser.
3. Log in using the credentials created via `python manage.py createsuperuser`.
