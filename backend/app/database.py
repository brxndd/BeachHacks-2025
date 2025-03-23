from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

# Get connection string from environment variables
URL_DATABASE = os.getenv("DATABASE_URL")

# Handle special characters in password
if URL_DATABASE and URL_DATABASE.startswith("postgres://"):
    URL_DATABASE = URL_DATABASE.replace("postgres://", "postgresql://", 1)

engine = create_engine(URL_DATABASE)

# Fix parameter names (lowercase)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Add this function for dependency injection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()