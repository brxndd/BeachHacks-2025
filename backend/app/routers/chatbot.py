from fastapi import APIRouter

router = APIRouter()

@router.get("/chatbot")
async def home():
    return {"message": "Welcome to the Chatbot!"}
