from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.database import get_db
from app.models import User
from app.utils import get_password_hash, verify_password
from app.routers import home, chatbot, medicine, todo  # importing all routers

# creating app instance 
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


#input for questionnaire
class UserInput(BaseModel):
    
    """
        FORM will track:
        - Name 
        - Age
        - Biological Sex 
        - Race 
        - Conditions 
    """
    name: str 
    age: int
    sex: str 
    race: str     
    conditions: List[str]

# New authentication models
class UserLogin(BaseModel):
    email: str
    password: str
    conditions: List[str]

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

# Updated authentication endpoints with database integration
@app.post("/login")
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    NextAuth.js integration endpoint with Neon.tech database
    """
    try:
        # Find user by email
        user = db.query(User).filter(User.email == credentials.email).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        # Verify password
        if not verify_password(credentials.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        # Return user data
        return {
            "id": user.id,
            "email": user.email,
            "name": user.name
        }
    except Exception as e:
        print("Login error:", str(e))
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/signup")
async def signup(user_data: UserSignUp, db: Session = Depends(get_db)):
    """
    Signup endpoint with proper database integration
    """
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash password
        hashed_password = get_password_hash(user_data.password)

        # Create new user
        new_user = User(
            email=user_data.email,
            hashed_password=hashed_password,
            name=user_data.name
        )

        # Save user to database
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Return user data
        return {
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.name
        }
    except Exception as e:
        # Rollback in case of error
        db.rollback()
        print("Signup error:", str(e))
        raise HTTPException(status_code=500, detail="Internal server error")