# app/routes/transaction.py
from fastapi import APIRouter, Depends
from app.controllers import transaction
from app.middlewares.auth_handler import get_current_user, get_current_admin
from app.models.user import User
from app.schemas.transaction import TransactionCreate, TransactionResponse, UserTransactionsResponse

router = APIRouter( tags=["Transactions"])


# POST /transactions/new (auth required)
@router.post("/new", response_model=TransactionResponse, status_code=201)
async def new_transaction(data: TransactionCreate, user: User = Depends(get_current_user)):
    return await transaction.new_transaction(data, user)


# GET /transactions/all (admin only)
@router.get("/all", response_model=list[TransactionResponse])
async def all_transactions(user: User = Depends(get_current_admin)):
    return await transaction.all_transactions()


# GET /transactions/{userId} (auth required)
@router.get("/{userId}", response_model=UserTransactionsResponse)
async def user_transactions(userId: str, user: User = Depends(get_current_user)):
    return await transaction.get_user_transactions(userId)
