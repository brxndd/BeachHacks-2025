from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated
from . import models
from .database import engine
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.routers import home, chatbot, medicine, todo # importing all routers
from fastapi.middleware.cors import CORSMiddleware # import middleware


# creating app instance 
app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class PostBase(BaseModel):
    title: str
    content:str
    user_id: int

class MedicationBase(BaseModel):
    name: str
    dosage: str
    time_to_take: str
    user_id: int

class UserBase(BaseModel):
    username: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# including all routers 
app.include_router(home.router)
app.include_router(chatbot.router)
app.include_router(medicine.router)
app.include_router(todo.router)

# pydantic model
"""
    FORM will track:
    - Name 
    - Age
    - Biological Sex 
    - Race 
    - Conditions 
"""
class UserInput(BaseModel):
    name: str 
    age: int 
    sex: str 
    race: str     
    condition: str 


# add CORS middleware for front and backend commmunication
app.add_middleware(
    CORSMiddleware,
        allow_origins=["http://localhost:3000"], # Allow requests from Next.js frontend
        allow_credentials=True,
        allow_methods=["*"],  # Allow all HTTP methods
        allow_headers=["*"],  # Allow all headers
    )


# CRUD opperations
@app.get("/")
async def root():
    return {"message": "Root!"}

# get form from user input
@app.post("/form/")
async def create_form(form: UserInput):
    return form

@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = models.User(**user.model_dump())
    db.add(user)
    db.commit()

@app.post("/medications/", status_code=status.HTTP_201_CREATED)
async def create_user(user: MedicationBase, db: Session = Depends(get_db)):
    db_med = models.Medication(**med.model_dump())
    db.add(db_med)
    db.commit()
    db.refresh(db_med)
    return db_med

