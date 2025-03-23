from sqlalchemy import Boolean, Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True)

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50))
    content = Column(String(100))
    user_id = Column(Integer)

class Meication(Base):
    __tablename__ = 'medications'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    dosage = Column(String(50))
    time_to_take = Column(String(50))
    user_id = Column(Integer)