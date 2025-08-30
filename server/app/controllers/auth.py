from fastapi import HTTPException, status, Response
from passlib.context import CryptContext
from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin, UserResponseFull, UserResponse
from app.utils.jwt_handler import create_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# POST /auth/signup
async def sign_up(data: UserCreate, response: Response) -> UserResponse:
    user_exists = await User.find_one({"name": data.name, "phone": data.phone})
    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )

    hashed_password = pwd_context.hash(data.password)

    new_user = User(
        name=data.name,
        phone=data.phone,
        password=hashed_password,
    )
    await new_user.insert()

    create_token(response, str(new_user.id ))  # sets cookie

    return UserResponse.from_model(new_user).model_dump(by_alias=True)


# POST /auth/login
async def log_in(data: UserLogin, response: Response) -> UserResponse:
    existing_user = await  User.find_one({"name": data.name, "phone": data.phone})
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    existing_user = await User.get(existing_user.id)


    if not pwd_context.verify(data.password, existing_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password",
        )

    create_token(response, str(existing_user.id))

    return UserResponse.from_model(existing_user).model_dump(by_alias=True)


# POST /auth/logout
async def log_out(response: Response):
    response.delete_cookie("jwt")
    return {"message": "Logged Out Successfully"}


# GET /auth/all-users
async def get_all_users() -> list[UserResponseFull]:
    users = await User.find_all().to_list()
    return [UserResponseFull.from_model(u).model_dump(by_alias=True) for u in users]
