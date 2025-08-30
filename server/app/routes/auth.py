# app/routes/auth.py
from fastapi import APIRouter, Depends, Response
from app.controllers import auth
from app.middlewares.auth_handler import get_current_user, get_current_admin
from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin, UserResponse, UserResponseFull

router = APIRouter( tags=["Auth"])


@router.post("/signup", response_model=UserResponse, status_code=201)
async def signup(data: UserCreate, response: Response):
    return await auth.sign_up(data, response)


@router.post("/login", response_model=UserResponse, status_code=201)
async def login(data: UserLogin, response: Response):
    return await auth.log_in(data, response)


@router.post("/logout")
async def logout(response: Response):
    return await auth.log_out(response)


@router.get("/all-users", response_model=list[UserResponseFull])
async def all_users(user: User = Depends(get_current_admin)):
    return await auth.get_all_users()
