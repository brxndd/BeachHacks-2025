import os
from typing import Dict, List, Optional, Tuple
import uuid
import logging
from openai import OpenAI
import httpx
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class TaskRecommender:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), http_client=httpx.Client())
        self.sessions: Dict[str, List[Dict]] = {}
        self.system_context = [
            {
                'role': 'system',
                'content': """
                ## Scope
                - Focus on generating daily tasks for heart health improvement.
                - Use user information: age, sex, race, and heart conditions/diseases.

                ## Responsibility
                - Prioritize relating the daily tasks to the user's heart conditions/diseases and age
                - Explain the benefit of the task
                - Be specific about the tasks
                    - Example: Choosing a specific excercise based on their age
                    - Example: Choosing a specific diet to follow based on their race

                ## Response Style
                - Maintain a friendly, empathetic, and supportive tone throughout the conversation.
                - Provide clear, concise, and helpful responses.
                - Output the tasks in the following exact format:
                - BE SURE TO MENTION THEIR AGE, SEX, RACE, OR HEART CONDITION WHEN STATING THE TASK
                    1. [Task 1]
                    2. [Task 2]
                    3. [Task 3]
                    4. [Task 4]
                    5. [Task 5]
                - Each task being about 30 words
                """
            }
        ]

    def _generate_session_id(self) -> str:
        """Generate a unique session ID for each user."""
        return str(uuid.uuid4())

    def _get_completion(self, messages: List[Dict], temperature: float = 0.7) -> Optional[str]:
        """Get a completion from the OpenAI API."""
        try:
            completion = self.client.chat.completions.create(
                model="gpt-4",  # Use GPT-4 for better task generation
                messages=messages,
                temperature=temperature
            )
            return completion.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API Error: {str(e)}")
            return None

    def get_tasks(self, age: int, sex: str, race: str, conditions: List[str], session_id: Optional[str] = None) -> Tuple[Optional[List[str]], str]:
        """
        Generate 5 daily tasks based on user information.
        """
        # Create new session if none exists
        if not session_id or session_id not in self.sessions:
            session_id = self._generate_session_id()
            self.sessions[session_id] = self.system_context.copy()  # Initialize with system context

        # Get conversation history
        conversation_history = self.sessions[session_id]

        try:
            # Create a prompt with user information
            prompt = f"""
            Given the following user information:
            - Age: {age}
            - Sex: {sex}
            - Race: {race}
            - Conditions: {', '.join(conditions)}

            Generate 5 daily tasks to improve heart health in the following exact format:
            1. [Task 1]
            2. [Task 2]
            3. [Task 3]
            4. [Task 4]
            5. [Task 5]
            """

            # Add the prompt to the conversation
            conversation_history.append({'role': 'user', 'content': prompt})

            # Get AI response
            assistant_response = self._get_completion(conversation_history, temperature=0.7)

            if not assistant_response:
                return None, session_id

            # Extract tasks from the response
            import re
            tasks = re.findall(r'\d+\.\s*(.*)', assistant_response)

            # Add assistant response to history
            conversation_history.append({'role': 'assistant', 'content': assistant_response})

            # Update session storage
            self.sessions[session_id] = conversation_history

            return tasks, session_id

        except Exception as e:
            logger.error(f"Error generating tasks: {str(e)}")
            return None, session_id

    def reset_session(self, session_id: str) -> None:
        """Reset the session for a given session ID."""
        if session_id in self.sessions:
            del self.sessions[session_id]
