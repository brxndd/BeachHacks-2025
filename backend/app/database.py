from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = 'mysql+pymysql://heartuser:password123@localhost:3306/heart2heart'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoFlush=False, Bind=engine)

Base = declarative_base()