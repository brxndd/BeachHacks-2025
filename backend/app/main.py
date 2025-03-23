from fastapi import FastAPI
from app.routers import home, chatbot, medicine, todo # importing all routers
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/")
async def root():
    return {"message": "Root!"}




