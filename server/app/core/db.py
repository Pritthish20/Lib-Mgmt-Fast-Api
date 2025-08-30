
import motor.motor_asyncio
from beanie import init_beanie
from app.core.config import settings

# import all your models here (like mongoose models in Node)
from app.models.user import User
from app.models.book import Book
from app.models.transaction import Transaction


async def connect_db():
    try:
        # Create Motor client
        client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
        db = client[settings.MONGO_DB]

        # Initialize Beanie (like mongoose.model registration)
        await init_beanie(
            database=db,
            document_models=[User, Book, Transaction]
        )

        print("✅ Successfully connected to MongoDB")

    except Exception as e:
        print(f"❌ MongoDB Connection Error: {e}")
        raise e
