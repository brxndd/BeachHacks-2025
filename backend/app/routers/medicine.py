# app/routers/home.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/medicine")
async def home():
        return {"message": "Welcome to the Medicine tab!"}
