from fastapi import FastAPI, HTTPException, Depends, status
from app.routers import home, chatbot, medicine, todo # importing all routers
from fastapi.middleware.cors import CORSMiddleware # import middleware


# creating app instance 
app = FastAPI()

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