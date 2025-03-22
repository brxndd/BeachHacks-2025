from fastapi import FastAPI
from app.routers import home, chatbot, medicine, todo # importing all routers

# creating app instance 
app = FastAPI()

# including all routers 
app.include_router(home.router)
app.include_router(chatbot.router)
app.include_router(medicine.router)
app.include_router(todo.router)

@app.get("/")
async def root():
    return {"message": "Root!"}




