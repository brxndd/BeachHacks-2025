# app/routers/chatbot.py
from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.chatbot_service import ChatbotService

router = APIRouter()
chatbot_service = ChatbotService()

class ChatRequest(BaseModel):
    user_message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        response, session_id = chatbot_service.get_response(
            user_message=request.user_message,
            session_id=request.session_id
        )
        return {"response": response, "session_id": session_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))