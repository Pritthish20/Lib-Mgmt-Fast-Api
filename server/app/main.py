from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.db import connect_db, disconnect_db
from app.routes import auth, book, transaction
from app.middlewares.logger import logger_middlewares


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Lifespan: Starting DB connection...")
    try:
        await connect_db()
        print("Lifespan: DB connection succeeded.")
    except Exception as e:
        print(f"Lifespan: DB connection failed with error: {e}")
        import traceback
        print(traceback.format_exc())
        raise
    yield
    await disconnect_db()
    print("Lifespan: DB disconnected")


app = FastAPI(title="Library Management API", lifespan=lifespan)


# Middleware
logger_middlewares(app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", settings.FRONTEND_URI],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Test Route
@app.get("/")
async def root():
    return {"message": "🚀 FastAPI server is running fine"}


# Routes
app.include_router(auth.router, prefix="/api/vv/auth", tags=["Auth"])
app.include_router(book.router, prefix="/api/vv/books", tags=["Books"])
app.include_router(transaction.router, prefix="/api/vv/transaction", tags=["Transaction"])
