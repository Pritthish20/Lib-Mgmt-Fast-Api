from typing import List
from pydantic import Field, field_validator, ConfigDict
from pymongo import IndexModel, ASCENDING
import re
from bson import ObjectId
from app.models.base import BaseDocument, PyObjectId


class User(BaseDocument):
    name: str = Field(..., max_length=64, description="User's full name")
    phone: str = Field(..., description="Phone number (10 digits, unique)")
    password: str = Field(..., min_length=2, description="Hashed password")
    borrowed: List[PyObjectId] = Field(default_factory=list, description="List of borrowed book IDs")

    is_admin: bool = Field(default=False, description="Admin privileges flag")

    class Settings:
        name = "users"
        indexes = [
            IndexModel([("phone", ASCENDING)], unique=True),  # Unique phone index
        ]

    # Phone validation
    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        if not re.match(r'^\d{10}$', v):
            raise ValueError('Phone number must be exactly 10 digits')
        return v

    # Ensure ObjectId values are converted to strings when serializing
    @field_validator('borrowed', mode='before')
    @classmethod
    def convert_borrowed_objectid_to_str(cls, v):
        return [str(x) if hasattr(x, "hex") else x for x in v]

    @field_validator("borrowed", mode="before")
    @classmethod
    def validate_borrowed_ids(cls, v):
        # Convert input strings to PyObjectId instances if needed
        if not v:
            return []
        return [PyObjectId.validate(x) if isinstance(x, (str, ObjectId)) else x for x in v]

    @field_validator("borrowed")
    @classmethod
    def serialize_borrowed_ids(cls, v):
        # Convert ObjectIds to string on output
        return [str(x) for x in v]

    # Pydantic v2 config
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "John Doe",
                "phone": "9876543210",
                "password": "hashed_password_here",
                "borrowed": [],
                "is_admin": False,
            }
        }
    )
