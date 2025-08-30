from pydantic import BaseModel, Field
from app.models.book import Book
from pydantic.alias_generators import to_camel
from pydantic import BaseModel, Field, ConfigDict


# Request schema for creating a new book
class BookCreate(BaseModel):
    title: str = Field(..., example="The Great Gatsby", description="Title of the book")
    author: str = Field(..., example="F. Scott Fitzgerald", description="Author of the book")
    year: int = Field(..., example=1925, description="Publication year")

# Request schema for updating book info (partial update allowed)
class BookUpdate(BaseModel):
    title: str | None = Field(None, example="The Great Gatsby")
    author: str | None = Field(None, example="F. Scott Fitzgerald")
    year: int | None = Field(None, example=1925)


# Response schema for returning book details
class BookResponse(BaseModel):
    id: str = Field(..., example="64ecf8a2f1e4b9d5f1234567", alias="_id", description="Book ID")
    title: str = Field(..., example="The Great Gatsby")
    author: str = Field(..., example="F. Scott Fitzgerald")
    year: int = Field(..., example=1925)
    status: str = Field(..., example="Available")

    model_config = ConfigDict(
        alias_generator=to_camel,  # applies camelCase to all fields except ones with explicit alias
        populate_by_name=True,
    )


    @classmethod
    def from_model(cls, book: Book) -> "BookResponse":
        return cls(
            id=str(book.id),
            title=book.title,
            author=book.author,
            year=book.year,
            status=book.status,
        )
