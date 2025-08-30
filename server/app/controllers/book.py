from fastapi import HTTPException, status
from beanie import PydanticObjectId
from app.models.book import Book
from app.schemas.book import BookCreate, BookUpdate, BookResponse
from datetime import datetime, timezone

# POST /books/add
async def add_book(data: BookCreate) -> BookResponse:
    new_book = Book(**data.model_dump())
    await new_book.insert()
    return BookResponse.from_model(new_book).model_dump(by_alias=True)


# PUT /books/update/{bookId}
async def update_book(bookId: str, data: BookUpdate) -> BookResponse:
    update_data = data.model_dump(exclude_unset=True)
    update_data['updatedAt'] = datetime.now(timezone.utc)

    await Book.find_one(Book.id == PydanticObjectId(bookId)).update({"$set": update_data})

    # Fetch updated document after partial update
    book = await Book.get(PydanticObjectId(bookId))
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    return BookResponse.from_model(book).model_dump(by_alias=True)



# DELETE /books/delete/{bookId}
async def delete_book(bookId: str) -> dict:
    book = await Book.get(PydanticObjectId(bookId))
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found",
        )
    await book.delete()
    return {"message": "Book deleted successfully"}


# GET /books/all-books
async def all_books() -> list[BookResponse]:
    books = await Book.find_all().to_list()
    return [BookResponse.from_model(b).model_dump(by_alias=True) for b in books]


# GET /books/{bookId}
async def specific_book(bookId: str) -> BookResponse:
    book = await Book.get(PydanticObjectId(bookId))
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found",
        )
    return BookResponse.from_model(book).model_dump(by_alias=True)
