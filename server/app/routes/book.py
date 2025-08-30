# app/routes/book.py
from fastapi import APIRouter, Depends
from app.controllers import book
from app.middlewares.auth_handler import get_current_user, get_current_admin
from app.models.user import User
from app.schemas.book import BookCreate, BookUpdate, BookResponse

router = APIRouter( tags=["Books"])


# POST /books/add (admin only)
@router.post("/add", response_model=BookResponse, status_code=201)
async def add_book(data: BookCreate, user: User = Depends(get_current_admin)):
    return await book.add_book(data)


# PUT /books/update/{bookId} (admin only)
@router.put("/update/{bookId}", response_model=BookResponse)
async def update_book(bookId: str, data: BookUpdate, user: User = Depends(get_current_admin)):
    return await book.update_book(bookId, data)


# DELETE /books/delete/{bookId} (admin only)
@router.delete("/delete/{bookId}")
async def delete_book(bookId: str, user: User = Depends(get_current_admin)):
    return await book.delete_book(bookId)


# GET /books/all-books (public)
@router.get("/all-books", response_model=list[BookResponse])
async def all_books():
    return await book.all_books()


# GET /books/{bookId} (auth required)
@router.get("/{bookId}", response_model=BookResponse)
async def specific_book(bookId: str, user: User = Depends(get_current_user)):
    return await book.specific_book(bookId)
