from pydantic import BaseModel, Field, ConfigDict
from typing import Literal, List,Optional
from datetime import datetime
from app.models.transaction import Transaction
from app.models.book import Book
from app.models.user import User
from app.schemas.book import BookResponse
from app.schemas.auth import UserResponse
from pydantic.alias_generators import to_camel

class TransactionCreate(BaseModel):
    book_id: str = Field(..., alias="bookId", example="64ecf8a2f1e4b9d5f1234567", description="Book ID")
    user_id: str = Field(..., alias="userId", example="64ecf8a2f1e4b9d5f7654321", description="User ID")
    type: Literal["borrow", "return"] = Field(..., example="borrow", description="Transaction type")

    model_config = ConfigDict(
        populate_by_name=True   # Allows using either alias or field name for population
    )

class TransactionResponse(BaseModel):
    id: str = Field(..., alias="_id", description="Transaction ID")
    bookId: Optional[BookResponse]  # full book data
    userId: Optional[UserResponse]  # full user data
    type: Literal["borrow", "return"]
    date: datetime

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    @classmethod
    def from_model(cls, txn: Transaction, book: Book = None, user: User = None) -> "TransactionResponse":
        return cls(
            id=str(txn.id),
            bookId=BookResponse.from_model(book) if book else None,
            userId=UserResponse.from_model(user) if user else None,
            type=txn.type,
            date=txn.date,
        )



class UserTransactionsResponse(BaseModel):
    books_borrowed: List[BookResponse]
    count_books: int

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    @classmethod
    def from_model(cls, books: List[Book]) -> "UserTransactionsResponse":
        return cls(
            books_borrowed=[BookResponse.from_model(b) for b in books],
            count_books=len(books),
        )