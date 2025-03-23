from fastapi import APIRouter, HTTPException
from app.services.recommender_service import Recommender
from typing import List

router = APIRouter()
recommender_service = Recommender()

@router.post("/generate-tasks/")
async def generate_tasks(age: int, sex: str, race: str, conditions: List[str]):
    try:
        tasks = recommender_service.generate_daily_tasks(age, sex, race, conditions)
        return {"tasks": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
