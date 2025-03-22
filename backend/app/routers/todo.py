from fastapi import APIRouter

router = APIRouter()

@router.get("/todo")
async def todo():
    return {"message": "Welcome to the Todo tab!"}



