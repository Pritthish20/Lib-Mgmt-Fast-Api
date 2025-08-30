from datetime import datetime, timedelta, timezone
from jose import jwt
from fastapi import Response
from app.core.config import settings

SECRET_KEY = settings.JWT_SECRET
ALGORITHM = settings.JWT_ALGORITHM
ACCESS_TOKEN_EXPIRE_HOURS = settings.ACCESS_TOKEN_EXPIRE_HOURS

def create_token(response: Response, user_id: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {"userId": user_id, "exp": expire}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    # Set cookie
    response.set_cookie(
        key="jwt",
        value=token,
        httponly=True,   # uncomment for better security
        secure=True,
        samesite="none",
        max_age=ACCESS_TOKEN_EXPIRE_HOURS * 60 * 60,
    )

    return token
