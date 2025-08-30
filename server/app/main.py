from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.db import connect_db
from app.routes import auth, book, transaction
from app.middlewares.logger import logger_middlewares

app = FastAPI(title="Library Management API")

# Middleware
logger_middlewares(app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", settings.FRONTEND_URI],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Connect on Startup
@app.on_event("startup")
async def start_db():
    await connect_db()

# Test Route
@app.get("/")
async def root():
    return {"message": "🚀 FastAPI server is running fine"}

# Routes
app.include_router(auth.router, prefix="/api/vv/auth", tags=["Auth"])
app.include_router(book.router, prefix="/api/vv/books", tags=["Books"])
app.include_router(transaction.router, prefix="/api/vv/transaction", tags=["Transaction"])
