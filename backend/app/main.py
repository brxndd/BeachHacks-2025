from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.routers import home, chatbot, medicine, todo  # importing all routers
from fastapi.middleware.cors import CORSMiddleware  # import middleware

# Create app instance 
app = FastAPI()

# Consolidated CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all existing routers 
app.include_router(home.router)
app.include_router(chatbot.router)
app.include_router(medicine.router)
app.include_router(todo.router)

# Original Pydantic model
class UserInput(BaseModel):
    name: str 
    age: int 
    prev_condition: bool

# New authentication models
class UserLogin(BaseModel):
    email: str
    password: str

class UserSignUp(BaseModel):
    email: str
    password: str
    name: str

# Original endpoints
@app.get("/")
async def root():
    return {"message": "Root!"}

@app.post("/form/")
async def create_form(form: UserInput):
    return form

# New authentication endpoints
@app.post("/login")
async def login(credentials: UserLogin):
    """
    NextAuth.js integration endpoint
    Replace with your actual authentication logic
    """
    # Demo validation - replace with database check
    if credentials.email == "test@example.com" and credentials.password == "password":
        return {
            "id": 1,
            "email": credentials.email,
            "name": "Test User"
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

# Add proper error handling for duplicate emails
@app.post("/signup")
async def signup(user_data: UserSignUp):
    # Add actual database check here
    if user_data.email == "existing@example.com":
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Return mock response - replace with DB insertion
    return {
        "id": 2,
        "email": user_data.email,
        "name": user_data.name
    }