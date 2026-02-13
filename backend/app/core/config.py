from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/studyai"
    REDIS_URL: str = "redis://localhost:6379"
    OPENAI_API_KEY: str = ""
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    S3_BUCKET: str = "studyai-uploads"
    
    class Config:
        env_file = ".env"

settings = Settings()