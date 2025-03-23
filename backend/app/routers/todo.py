from fastapi import APIRouter, HTTPException
from app.services.recommender_service import TaskRecommender  # Import the TaskRecommender class
from typing import List

router = APIRouter()
task_recommender = TaskRecommender()  # Initialize the TaskRecommender

@router.post("/generate-tasks/")
async def generate_tasks(age: int, sex: str, race: str, conditions: List[str]):
    try:
        # Call the get_tasks method from TaskRecommender
        tasks, session_id = task_recommender.get_tasks(age, sex, race, conditions)
        
        if tasks:
            return {"tasks": tasks, "session_id": session_id}
        else:
            raise HTTPException(status_code=500, detail="Failed to generate tasks")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
