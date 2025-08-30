import motor.motor_asyncio
from beanie import init_beanie
from app.models.user import User
from app.models.book import Book
from app.models.transaction import Transaction
from app.core.config import settings

# Global Mongo client
client: motor.motor_asyncio.AsyncIOMotorClient | None = None


async def connect_db():
    """
    Connect to MongoDB (Atlas/Local) and init Beanie once at startup.
    """
    global client
    if client:  # Already connected (avoid re-init in warm starts)
        print("⚡ Mongo already initialized, skipping re-init")
        return

    try:
        print("🔌 Connecting to MongoDB...")
        client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
        db = client[settings.MONGO_DB]

        await init_beanie(
            database=db,
            document_models=[User, Book, Transaction]
        )

        print("✅ MongoDB connection established + Beanie initialized")
    except Exception as e:
        print(f"❌ MongoDB Connection Error: {e}")
        raise e


async def disconnect_db():
    """
    Disconnect MongoDB cleanly on app shutdown.
    """
    global client
    if client:
        client.close()
        print("🛑 MongoDB connection closed")
