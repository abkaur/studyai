from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.file_processor import extract_text_from_pdf
from app.services.ai_generator import generate_study_material

router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported in the MVP")

    try:
        contents = await file.read()

        text = extract_text_from_pdf(contents)

        if not text or len(text.strip()) < 50:
            raise HTTPException(status_code=400, detail="Could not extract readable text from this PDF")

        materials = generate_study_material(text)

        return {
            "filename": file.filename,
            "preview": text[:500],
            "materials": materials
        }

    except HTTPException:
        raise

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to process PDF file")
