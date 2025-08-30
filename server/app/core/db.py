import motor.motor_asyncio
from beanie import init_beanie
from app.core.config import settings

# Import your models
from app.models.user import User
from app.models.book import Book
from app.models.transaction import Transaction

# Global client reference
client: motor.motor_asyncio.AsyncIOMotorClient | None = None


async def connect_db():
    global client
    try:
        print("🔌 Connecting to MongoDB...")
        client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
        db = client[settings.MONGO_DB]

        await init_beanie(
            database=db,
            document_models=[User, Book, Transaction]
        )

        print("✅ Successfully connected to MongoDB")

    except Exception as e:
        print(f"❌ MongoDB Connection Error: {e}")
        import traceback
        print(traceback.format_exc())
        raise e


async def disconnect_db():
    global client
    if client:
        client.close()
        print("🛑 MongoDB connection closed")
