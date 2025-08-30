from fastapi import HTTPException, status
from beanie import PydanticObjectId
from datetime import datetime, timezone

from app.models.book import Book
from app.models.user import User
from app.models.transaction import Transaction
from app.schemas.transaction import (
    TransactionCreate,
    TransactionResponse,
    UserTransactionsResponse,
)


# POST /transactions/new
async def new_transaction(data: TransactionCreate, user: User) -> TransactionResponse:
    book = await Book.get(PydanticObjectId(data.book_id))
    db_user = await User.get(PydanticObjectId(data.user_id))

    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # validations
    if data.type == "borrow" and book.status != "Available":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Book not available")
    if data.type == "return" and book.status == "Available":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Book already marked available")
    else :
        db_user.borrowed = [b for b in db_user.borrowed if str(b) != str(book.id)]


    # create transaction
    new_txn = Transaction(
        book_id=book.id,
        user_id=db_user.id,
        type=data.type,
        date=datetime.now(timezone.utc),
    )
    await new_txn.insert()

    # update book + user
    if data.type == "borrow":
        db_user.borrowed.append(book.id)
        await db_user.save()
        book.status = "Not Available"
        await book.save()

    elif data.type == "return":
        db_user.borrowed = [b for b in db_user.borrowed if str(b) != str(book.id)]
        await db_user.save()
        book.status = "Available"
        await book.save()

    return TransactionResponse.from_model(new_txn).model_dump(by_alias=True)


# GET /transactions/all
async def all_transactions() -> list[TransactionResponse]:
    txns = await Transaction.find_all().to_list()
    
    results = []
    for txn in txns:
        book = await Book.get(txn.book_id)
        user = await User.get(txn.user_id)
        results.append(TransactionResponse.from_model(txn, book=book, user=user))
    return [r.model_dump(by_alias=True) for r in results]



# GET /transactions/{userId}
async def get_user_transactions(userId: str) -> UserTransactionsResponse:
    user = await User.get(PydanticObjectId(userId))
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    borrowed_books = []
    for book_id in user.borrowed or []:
        book = await Book.get(book_id)
        if book:
            borrowed_books.append(book)

    if not borrowed_books:  # 🚀 Same as Node’s 404 when no books borrowed
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No Books Borrowed",
        )

    return UserTransactionsResponse.from_model(borrowed_books).model_dump(by_alias=True)
