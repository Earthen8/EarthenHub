# EarthenHub

Welcome to **EarthenHub**, the repository for my personal website and professional portfolio. 

This project is a monorepo consisting of a **Django REST Framework** backend API and a **Next.js 15** frontend web app. It is designed to run seamlessly in local development and is fully Dockerized for production deployment (e.g., using a Cloudflare Tunnel).

---

## Project Structure

```text
earthenhub/
├── backend/            # Django REST API (Content Management & Inquiries)
├── frontend/           # Next.js App Router (UI & Resend email client)
├── docker-compose.yml  # Multi-container orchestrator for production
└── README.md           # Project-level overview (this file)
```

---

## Tech Stack

* **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS v4, Lucide Icons.
* **Backend**: Django 5.2, Django REST Framework (DRF), SQLite (default local database).
* **Emails**: Resend API (integrated via Next.js Server Actions).
* **Storage**: Cloudflare R2 (S3-compatible object storage for media files).
* **Containerization**: Docker & Docker Compose.

---

## Local Development Setup

To run this project locally, you will need to start both the backend API and the frontend development server.

### 1. Backend Setup (Django)

Navigate to the `backend` directory and follow these steps:

1. **Create and activate a virtual environment**:
   ```bash
   cd backend
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory (see `backend/.env.example` for reference):
   ```env
   DEBUG=True
   SECRET_KEY=django-insecure-dev-key-for-local-testing
   ```

4. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser** (to access the admin panel):
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the backend development server**:
   ```bash
   python manage.py runserver
   ```
   The backend API will run at **`http://127.0.0.1:8000/`**.

---

### 2. Frontend Setup (Next.js)

Navigate to the `frontend` directory and follow these steps:

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env.local` file in the `frontend/` directory (see `frontend/.env.example` for reference):
   ```env
   # Browser/Client endpoint (uses Next.js rewrite proxy)
   NEXT_PUBLIC_API_URL=/api
   
   # Server-side API endpoint (calls Django directly)
   NEXT_SERVER_API_URL=http://127.0.0.1:8000/api
   
   # Resend API Key for sending email inquiries
   RESEND_API_KEY=re_your_api_key
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The frontend will run at **`http://localhost:3000/`**.

---

## Production / Docker Deployment

This codebase is configured to be run in containerized mode via Docker Compose and published using a Cloudflare Tunnel. Media assets (images) are stored on Cloudflare R2.

### Docker Compose
To deploy in production:

1. Create a `.env` file at the root folder of the project containing all production credentials (Resend API key, Cloudflare R2 API keys, etc. - see `.env.example`).
2. Run Docker Compose:
   ```bash
   docker compose up -d --build
   ```

* The **backend** container runs internally on port `8000`.
* The **frontend** container runs Next.js in `standalone` mode, serving the site on port `3000`.
* **Request Proxying**: Next.js automatically proxies `/api` requests to Django (`http://backend:8000`). For `/media` requests, Next.js acts as an internal reverse proxy to Cloudflare R2, masking the `r2.dev` bucket URL from the client browser.

### Cloudflare R2 Media Storage

For production deployments, the application integrates with **Cloudflare R2** to store media uploads (e.g. project screenshots and certification badges) instead of using the local server disk:
* **Upload Path**: Django routes media uploads directly to the R2 bucket using the S3 compatibility API (`django-storages[boto3]`). The server hosting the container does not store these files locally.
* **Access/Delivery Path**: To keep all assets under the primary domain and avoid exposing the default `*.r2.dev` bucket URL to clients, Next.js acts as a reverse proxy. Any client request to `https://earthen.my.id/media/<path>` is rewritten server-side by Next.js to forward to the R2 public URL.
* **Local Development Fallback**: In local development (`USE_CLOUDFLARE_R2=False` or unset), the backend automatically falls back to local disk storage using standard Django `FileSystemStorage`.


---

## Documentation

For component-level instructions and developer guides, please see:
* [Backend Documentation](file:///c:/Users/Earthen/dev/personal/earthenhub/backend/README.md)
* [Frontend Documentation](file:///c:/Users/Earthen/dev/personal/earthenhub/frontend/README.md)
