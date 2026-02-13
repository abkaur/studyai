# 📘 StudyAI (MVP) — PDF → Summary, Flashcards, Quiz

StudyAI is a web application that allows users to upload a PDF and automatically generate:

✅ A summary

✅ Flashcards

✅ A quiz

The project uses:

Frontend: React

Backend: FastAPI (Python)

This is an MVP (Minimum Viable Product) focused on demonstrating the end-to-end flow: file upload → backend processing → results shown in UI.

🚀 Features

Upload a .pdf file from the browser

Backend validates and extracts text from the PDF

Generates:

Summary

Flashcards

Quiz

Displays results in the React UI

Swagger API available for testing the backend

🏗️ Architecture (High Level)
[ React Frontend ]  --->  [ FastAPI Backend ]  --->  [ PDF Parser + AI Generator ]
        |                         |
        |                         └── Extract text from PDF
        |                         └── Generate summary / flashcards / quiz
        |
        └── Displays results in UI

🛠️ How to Run Locally
1) Backend (FastAPI)

Open a terminal in the backend folder:

cd backend


Create and activate virtual environment (Windows PowerShell):

python -m venv .venv
.\.venv\Scripts\Activate.ps1


Install dependencies:

pip install -r requirements.txt


Start the API:

uvicorn app.main:app --reload


Open Swagger UI:

http://127.0.0.1:8000/docs

2) Frontend (React)

Open a second terminal and go to the frontend folder:

cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🧑‍💻 How the App Works (User Flow)

User selects a .pdf file in the UI

User clicks Upload

React sends a POST request with multipart/form-data

FastAPI backend:

Validates file type

Extracts text from PDF

Generates:

Summary

Flashcards

Quiz

Backend returns JSON response

Frontend displays:

Summary

Flashcards

Quiz

📂 Project Structure
studyai/
├── backend/        # FastAPI backend
├── frontend/       # React frontend
├── terraform/      # (Future infrastructure setup)
├── README.md
└── .gitignore

🧪 Current Status (MVP)

✅ PDF upload works

✅ Backend processes PDF

✅ Frontend displays results

⚠️ AI output is currently simplified / placeholder logic

⚠️ No authentication yet

⚠️ Only PDF supported

🔮 Future Enhancements

Real AI integration:
Replace the current placeholder logic with real AI models (OpenAI / Azure OpenAI / local LLMs) to generate high-quality summaries, flashcards, and quizzes.

Better PDF extraction:
Improve accuracy for complex PDFs (tables, columns, scanned PDFs) and add OCR for scanned documents.

More file formats:
Support PPTX and DOCX uploads.

Export options:
Download results as PDF/Word or export flashcards to Anki.

Improved UI/UX:
Add tabs for Summary/Flashcards/Quiz, loading indicators, error messages, and better styling.

User accounts & history:
Allow users to log in and save past uploads and generated materials.

Deployment:
Deploy frontend (Vercel/Netlify) and backend (Render/Fly.io) and manage environment variables securely.
