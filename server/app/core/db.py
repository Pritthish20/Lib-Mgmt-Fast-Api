import motor.motor_asyncio
from beanie import init_beanie
from app.models.user import User
from app.models.book import Book
from app.models.transaction import Transaction
from app.core.config import settings

# Global Motor client + init flag
client: motor.motor_asyncio.AsyncIOMotorClient | None = None
_beanie_initialized: bool = False


async def connect_db():
    """
    Lazy-init: Connect to MongoDB and initialize Beanie once per container.
    """
    global client, _beanie_initialized
    if _beanie_initialized:
        # Already initialized in this container
        return

    try:
        print("🔌 [DB] Connecting to MongoDB...")
        client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
        db = client[settings.MONGO_DB]

        # Register Beanie models (only once per container)
        await init_beanie(
            database=db,
            document_models=[User, Book, Transaction]
        )

        _beanie_initialized = True
        print("✅ [DB] Successfully connected & Beanie initialized")

    except Exception as e:
        print(f"❌ [DB] Connection Error: {e}")
        raise e


async def disconnect_db():
    """
    Optional cleanup — usually not needed in serverless (Vercel kills the container).
    """
    global client, _beanie_initialized
    if client:
        client.close()
        _beanie_initialized = False
        print("🛑 [DB] MongoDB connection closed")
