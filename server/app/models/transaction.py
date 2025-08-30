from pydantic import Field, ConfigDict
from pymongo import IndexModel, ASCENDING, DESCENDING
from datetime import datetime
from app.models.base import BaseDocument, PyObjectId


class Transaction(BaseDocument):
    book_id: PyObjectId = Field(..., description="Reference to Book _id")
    user_id: PyObjectId = Field(..., description="Reference to User _id")
    type: str = Field(..., pattern="^(borrow|return)$", description="Transaction type")
    date: datetime = Field(default_factory=datetime.now, description="Transaction timestamp")

    class Settings:
        name = "transactions"
        indexes = [
            IndexModel([("date", DESCENDING)]),                   # Index on date for recent transactions
        ]

    # Pydantic v2 config
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "book_id": "60f7b3b3b3f3b3b3b3f3b3b3",  # Example ObjectId
                "user_id": "60f7b3b3b3f3b3b3b3f3b3b4",  # Example ObjectId
                "type": "borrow",
                "date": "2025-08-27T14:13:00.000Z",
            }
        }
    )
