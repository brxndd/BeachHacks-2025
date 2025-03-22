# app/routers/home.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/home")
async def home():
    return {"message": "Welcome to the Home Tab!"}
