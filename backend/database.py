from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Database function to insert user input
def insert_user_input(input_text: str, input_number: int, input_boolean: bool):
    """
    Insert user input into the Supabase table.
    """
    try:
        response = supabase.table("user_input").insert({
            "input_text": input_text,
            "input_number": input_number,
            "input_boolean": input_boolean
        }).execute()
        return response.data
    except Exception as e:
        print(f"Error inserting data: {e}")
        raise


