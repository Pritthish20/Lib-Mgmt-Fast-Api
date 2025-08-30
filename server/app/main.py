from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.db import init_db
from app.routes import auth, book, transaction
from app.middlewares.logger import logger_middlewares

app = FastAPI(title="Library Management API")


# --- Middleware ---
logger_middlewares(app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", settings.FRONTEND_URI],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def db_init_middleware(request: Request, call_next):
    # ensure DB is initialized before processing any request
    await init_db()
    response = await call_next(request)
    return response


# --- Routes ---
@app.get("/")
async def root():
    return {"message": "🚀 FastAPI server is running fine"}

@app.get("/vercel-log-test")
async def log_test():
    print("✅ Vercel log test route hit!")
    return {"message": "Vercel logging works!"}

app.include_router(auth.router, prefix="/api/vv/auth", tags=["Auth"])
app.include_router(book.router, prefix="/api/vv/books", tags=["Books"])
app.include_router(transaction.router, prefix="/api/vv/transaction", tags=["Transaction"])
