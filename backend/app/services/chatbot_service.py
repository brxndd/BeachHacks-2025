# app/services/chatbot_service.py
import os
from typing import Dict, List, Optional, Tuple
import uuid
import logging
from openai import OpenAI
import httpx
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class ChatbotService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), http_client=httpx.Client())
        self.sessions: Dict[str, List[Dict]] = {}
        self.system_context = [
            {
                'role': 'system',
                'content': """"
                ## Identity
                You are HeartBot, a friendly and knowledgeable assistant for individuals with heart disease or at risk. 
                Your role is to provide compassionate support, answer questions about heart health, and offer guidance on medication 
                and lifestyle changes. Always remind users to consult a healthcare professional for personalized advice.

                ## Scope
                - Focus on heart health-related inquiries, medication guidance, and lifestyle recommendations.
                - Do not provide personalized medical advice or diagnose conditions.
                - Always encourage users to consult with a healthcare professional for personalized care.

                ## Responsibility
                -Understand user concerns and offer relevant information or guidance.
                -Provide clear, empathetic, and supportive responses.
                -Keep answers concise and to the point.
                -Escalate to a human healthcare provider or professional when necessary.

                ## Response Style
                -Keep it 100-150 words per response.
                -Maintain a friendly, empathetic, and supportive tone throughout the conversation.
                -Provide clear, concise, and helpful responses.
                -Keep responses focused on offering helpful information about heart health, medication, and lifestyle changes.
                -Focus on essential information only, and always include a reminder to consult a healthcare professional.
                """
            }
        ]

    def _generate_session_id(self) -> str:
        return str(uuid.uuid4())

    def _get_completion(self, messages: List[Dict], temperature: float = 0.7) -> Optional[str]:
        try:
            completion = self.client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                temperature=temperature
            )
            return completion.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API Error: {str(e)}")
            return None

    def get_response(self, user_message: str, session_id: Optional[str] = None) -> Tuple[Optional[str], str]:
        # Create new session if none exists
        if not session_id or session_id not in self.sessions:
            session_id = self._generate_session_id()
            self.sessions[session_id] = self.system_context.copy()  # Initialize with system context

        # Get conversation history
        conversation_history = self.sessions[session_id]

        try:
            # Add user message to history
            conversation_history.append({'role': 'user', 'content': user_message})

            # Prepare full message list
            messages = conversation_history  # Already includes system context

            # Get AI response
            assistant_response = self._get_completion(messages, temperature=1)
            
            if not assistant_response:
                assistant_response = "I'm having trouble responding right now. Please try again later."

            # Add assistant response to history
            conversation_history.append({'role': 'assistant', 'content': assistant_response})

            # Update session storage
            self.sessions[session_id] = conversation_history

            return assistant_response, session_id

        except Exception as e:
            logger.error(f"Error processing message: {str(e)}")
            return "An error occurred while processing your request. Please try again.", session_id

    def reset_session(self, session_id: str) -> None:
        if session_id in self.sessions:
            del self.sessions[session_id]

# Example usage
if __name__ == "__main__":
    service = ChatbotService()
    
    # Test conversation
    test_messages = [
        "Hello",
        "What are some heart-healthy foods?",
        "What exercises are safe with heart disease?"
    ]
    
    session = None
    for msg in test_messages:
        response, session = service.get_response(msg, session)
        print(f"User: {msg}")
        print(f"Bot: {response}")
        print("-" * 50)