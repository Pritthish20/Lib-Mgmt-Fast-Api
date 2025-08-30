import motor.motor_asyncio
from beanie import init_beanie
from app.models.user import User
from app.models.book import Book
from app.models.transaction import Transaction
from app.core.config import settings

# Global Motor client + init flag
client: motor.motor_asyncio.AsyncIOMotorClient | None = None
_initialized: bool = False


async def connect_db():
    """
    Connect to MongoDB and initialize Beanie once per cold start.
    """
    global client, _initialized
    if _initialized:
        print("⚡ Mongo already initialized, skipping")
        return

    try:
        print("🔌 Connecting to MongoDB...")
        client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
        db = client[settings.MONGO_DB]

        await init_beanie(
            database=db,
            document_models=[User, Book, Transaction]
        )

        _initialized = True
        print("✅ Successfully connected to MongoDB")
    except Exception as e:
        print(f"❌ MongoDB Connection Error: {e}")
        raise e


async def disconnect_db():
    """
    Cleanly close Mongo client.
    """
    global client, _initialized
    if client:
        client.close()
        _initialized = False
        print("🛑 MongoDB connection closed")
