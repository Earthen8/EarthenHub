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
* **SQLite**: Database used for local development (`db.sqlite3`).

---

## Configuration & Environment Variables

Create a `.env` file in the root of the `backend/` directory to configure the environment:

```env
# Enable/Disable Django Debug Mode (True for local development, False for production)
DEBUG=True

# Secret key used for cryptographic signing
SECRET_KEY=django-insecure-some-secret-key-here
```

* **CORS & CSRF**:
  * In `DEBUG=True` mode, CORS allows all origins to simplify local testing, and CSRF is trusted for `localhost` and `127.0.0.1`.
  * In production (`DEBUG=False`), origins are locked down to `https://earthen.my.id`.

---

## Django Administration

To manage portfolio content or review contact form submissions:
1. Start the server (`python manage.py runserver`).
2. Navigate to `http://127.0.0.1:8000/api/admin/` in your browser.
3. Log in using the credentials created via `python manage.py createsuperuser`.
