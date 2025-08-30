from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.db import connect_db
from app.routes import auth, book, transaction
from app.middlewares.logger import logger_middlewares


app = FastAPI(title="Library Management API")


# --- DB Init Middleware ---
@app.middleware("http")
async def init_db_if_needed(request: Request, call_next):
    try:
        # initialize lazily (only once per container loop)
        await connect_db()
    except Exception as e:
        return JSONResponse({"error": f"DB init failed: {str(e)}"}, status_code=500)
    return await call_next(request)


# --- Other Middlewares ---
logger_middlewares(app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", settings.FRONTEND_URI],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Routes ---
@app.get("/")
async def root():
    return {"message": "🚀 FastAPI server is running fine"}


@app.get("/vercel-log-test")
async def log_test():
    print("✅ Vercel log test route hit!")
    return {"message": "Vercel logging works!"}


# Include routers
app.include_router(auth.router, prefix="/api/vv/auth", tags=["Auth"])
app.include_router(book.router, prefix="/api/vv/books", tags=["Books"])
app.include_router(transaction.router, prefix="/api/vv/transaction", tags=["Transaction"])
