from pydantic import BaseModel, Field, ConfigDict
from app.models.user import User
from typing import List
from pydantic.alias_generators import to_camel


# Request schema for signup
class UserCreate(BaseModel):
    name: str = Field(..., example="John Doe", description="Full name of the user")
    phone: str = Field(..., example="9876543210", description="10-digit phone number")
    password: str = Field(..., min_length=2, description="Password (min 6 characters)")


# Request schema for login
class UserLogin(BaseModel):
    name: str = Field(..., example="John Doe", description="Full name of the user")
    phone: str = Field(..., example="9876543210", description="10-digit phone number")
    password: str = Field(..., min_length=2, description="Password")


# Response schema for user


class UserResponseFull(BaseModel):
    id_: str = Field(
        ..., alias="_id", description="User ID"
    )  # Use id_ in Python, alias as _id in JSON
    name: str
    phone: str
    borrowed: List[str] = []
    is_admin: bool

    model_config = ConfigDict(
        alias_generator=to_camel,  # applies camelCase to all fields except ones with explicit alias
        populate_by_name=True,
    )

    @classmethod
    def from_model(cls, user: User) -> "UserResponseFull":
        return cls(
            id_=str(user.id),
            name=user.name,
            phone=user.phone,
            borrowed=[str(b) for b in user.borrowed],
            is_admin=user.is_admin,
        )

class UserResponse(BaseModel):
    id_: str = Field(
        ..., alias="_id", description="User ID"
    )  # Use id_ in Python, alias as _id in JSON
    name: str
    phone: str
    is_admin: bool

    model_config = ConfigDict(
        alias_generator=to_camel,  # applies camelCase to all fields except ones with explicit alias
        populate_by_name=True,
    )

    @classmethod
    def from_model(cls, user: User) -> "UserResponse":
        return cls(
            id_=str(user.id),
            name=user.name,
            phone=user.phone,
            is_admin=user.is_admin,
        )
