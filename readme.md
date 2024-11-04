
<div style="text-align: center; margin-bottom: 2rem;">
  <span style="font-size: 1.5rem;">📄 Project Documentation:</span>  
  <a href="https://toukoum.notion.site/Documentation-Stage-6c891c0c939e4db387a34a4b033db2e6">
    <img src="https://img.shields.io/badge/Documentation-8A2BE2" alt="Documentation Badge" width="100px"/>
  </a>
</div>

# Project Setup

This guide provides two options to set up and run the project:
1. **Dockerized Dev Environment**
2. **Local Dev Environment**

---

## 1. Docker Setup

### Prerequisites

- Docker & Docker Compose (v27 or higher)

### Running the Project

In the project root, run the following command:

```bash
docker compose up --build
```

---

## 2. Local Setup

### Prerequisites

- Python v3.12
- Node.js v18

### Running the Project

#### Backend Setup

1. Navigate to the `backend` directory and set up a virtual environment:
   
   ```bash
   cd backend
   python -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

2. Copy and configure the environment file:

   ```bash
   cp .env.example .env
   # Edit and save .env file as needed
   ```

3. Start the backend server:

   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

#### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies and run the development server:

   ```bash
   npm install
   npm run dev
   ```
