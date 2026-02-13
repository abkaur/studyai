# StudyAI (MVP) — PDF → Summary, Flashcards, Quiz

StudyAI is a lightweight web app that lets users upload a **PDF (lecture notes / slides / reading)** and generates study materials:
- ✅ Summary
- ✅ Flashcards
- ✅ Quiz (MCQs)

This is an MVP built with:
- **React** frontend
- **FastAPI** backend

> Current MVP behavior: the backend extracts text from the uploaded PDF and returns structured “study materials”.  
> Future enhancement: replace placeholder generation with real AI (OpenAI / local LLM).

---

## Features (MVP)
- Upload a **PDF** from the browser
- Backend extracts text + returns a preview
- Backend returns:
  - Summary
  - Flashcards (Q/A)
  - Quiz (MCQs + answers)
- Simple UI to display results

---

## Tech Stack
### Frontend
- React (Create React App)
- Fetch API (multipart/form-data upload)

### Backend
- FastAPI
- Uvicorn
- PDF text extraction (your PDF extraction library)
- CORS enabled for local development

---

## Project Structure
studyai/
backend/
app/
main.py
routers/
upload.py
services/
ai_generator.py
utils/
pdf_extractor.py (example name)
requirements.txt
frontend/
src/
App.js
App.css
components/
Upload.tsx (optional)
package.json
terraform/ (optional, if you added infra)
README.md


---

## API Overview
### Base URL (Local)
- `http://127.0.0.1:8000`

### Endpoints
- `GET /` → health check (“StudyAI API running”)
- `POST /api/upload/` → upload a PDF and receive study materials

> Note: If your router is included as:
> `app.include_router(upload.router, prefix="/api/upload")`
> and inside router you used `@router.post("/upload")`,
> then the final URL becomes:  
> ✅ `/api/upload/upload`  
> To make it just `/api/upload/`, use `@router.post("/")` instead.

---

## Run Locally (Step-by-step)

### 1) Backend (FastAPI)
Open terminal in the backend folder:
```bash
cd backend
Create & activate venv (Windows PowerShell):

python -m venv .venv
.\.venv\Scripts\Activate.ps1
Install dependencies:

pip install -r requirements.txt
Start the API:

uvicorn app.main:app --reload
Open Swagger:

http://127.0.0.1:8000/docs

### 2) Frontend (React)
Open a second terminal:

cd frontend
npm install
npm start
Frontend runs at:

http://localhost:3000

How Upload Works (User Flow)
User selects a .pdf file in the UI

React sends a POST request with multipart/form-data

FastAPI receives the file and:

validates the file type

extracts PDF text

generates study materials

React displays the results (summary, flashcards, quiz)

