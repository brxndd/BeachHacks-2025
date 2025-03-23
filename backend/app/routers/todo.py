from fastapi import APIRouter, HTTPException
from app.services.recommender_service import TaskRecommender  # Import the TaskRecommender class
from typing import List
from pydantic import BaseModel

router = APIRouter()
task_recommender = TaskRecommender()  # Initialize the TaskRecommender

class TaskRequest(BaseModel):
    age: int
    sex: str
    race: str
    conditions: List[str]

@router.post("/generate-tasks/")
async def generate_tasks(request: TaskRequest):
    try:
        # Now you can access the attributes as properties of 'request'
        tasks, session_id = task_recommender.get_tasks(
            request.age, request.sex, request.race, request.conditions
        )
        
        if tasks:
            return {"tasks": tasks, "session_id": session_id}
        else:
            raise HTTPException(status_code=500, detail="Failed to generate tasks")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
