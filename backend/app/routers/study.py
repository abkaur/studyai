from fastapi import APIRouter

router = APIRouter()

@router.get("/materials/{material_id}")
def get_study_materials():
    return {"message": "Get study materials endpoint"}

# We'll implement saving to DB later