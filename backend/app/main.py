from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import upload

app = FastAPI(title="StudyAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api/upload", tags=["upload"])

@app.get("/")
def root():
    return {"message": "StudyAI API running"}
