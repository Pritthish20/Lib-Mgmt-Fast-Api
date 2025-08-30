from pydantic import Field, ConfigDict
from pymongo import IndexModel, ASCENDING
from app.models.base import BaseDocument


class Book(BaseDocument):
    title: str = Field(..., max_length=64, description="Book title (unique)")
    author: str = Field(..., description="Author's name")
    year: int = Field(..., gt=-5000, le=2025, description="Publication year")
    status: str = Field(
        default="Available", 
        pattern="^(Available|Not Available)$",
        description="Current availability status"
    )

    class Settings:
        name = "books"
        indexes = [
            IndexModel([("title", ASCENDING)], unique=True),  # Unique index on title
            # IndexModel([("author", ASCENDING)]),              # Regular index on author
            # IndexModel([("year", ASCENDING)]),                # Index on year for filtering
        ]

    # Pydantic v2 config
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "title": "Clean Code",
                "author": "Robert C. Martin",
                "year": 2008,
                "status": "Available",
            }
        }
    )
