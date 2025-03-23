# app/services/recommender_service.py
import os
from typing import Dict, List, Optional, Tuple
import uuid
import logging
import httpx
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class Recommender:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), http_client=httpx.Client())
        self.sessions: Dict[str, List[Dict]] = {}
        self.system_context = [
            {
                'role': 'system',
                'content': """
                ## Scope
                - Focus on heart health-related inquiries, medication guidance, and lifestyle recommendations.
                - Examples: Diet, workouts that benefit the heart.
                - Provide personalized medical advice.

                ## Responsibility
                - Take in a user's information: age, sex, race, and heart conditions/diseases.
                - Generate 5 daily tasks to improve heart health based on the user's information.

                ## Response Style
                - Maintain a friendly, empathetic, and supportive tone.
                - Provide clear, concise, and helpful responses.
                - Output the tasks in the following exact format:
                    1. [Task 1]
                    2. [Task 2]
                    3. [Task 3]
                    4. [Task 4]
                    5. [Task 5]
                """
            }
        ]

    def generate_daily_tasks(self, age: int, sex: str, race: str, conditions: List[str]) -> List[str]:
        """
        Generate 5 daily tasks based on user information.
        """
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
        messages = self.system_context.copy()
        messages.append({'role': 'user', 'content': prompt})

        # Call the OpenAI API
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",  # Use the appropriate model
                messages=messages,
                max_tokens=200  # Adjust as needed
            )
            # Extract the generated tasks
            tasks_text = response.choices[0].message.content
            # Use regex to extract the tasks
            import re
            tasks = re.findall(r'\d+\.\s*(.*)', tasks_text)
            return tasks
        except Exception as e:
            logger.error(f"Failed to generate daily tasks: {e}")
            raise HTTPException(status_code=500, detail="Failed to generate daily tasks")
