from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()  # still works for .env

class Settings(BaseSettings):
    MONGO_URI: str
    MONGO_DB: str
    JWT_SECRET: str
    PORT: int
    FRONTEND_URI: str
    JWT_ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_HOURS: int

    class Config:
        env_file = ".env"  # auto load from .env

settings = Settings()
