from beanie import Document, before_event, Insert, Replace, SaveChanges
from datetime import datetime, timezone
from typing import Optional
from pydantic.alias_generators import to_camel
from pydantic import Field, ConfigDict
from bson import ObjectId
from pydantic_core import core_schema

class PyObjectId:
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.chain_schema([
                    core_schema.str_schema(),
                    core_schema.no_info_plain_validator_function(cls.validate),
                ]),
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(lambda v: str(v))
        )

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        if isinstance(v, str) and ObjectId.is_valid(v):
            return ObjectId(v)
        raise TypeError("ObjectId or valid ObjectId string expected")


class BaseDocument(Document):
    id: PyObjectId = Field(default_factory=ObjectId, alias="_id")
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        alias_generator=to_camel,
        populate_by_name=True,
        ser_json_tuples=True,
    )

    @before_event([Insert, Replace, SaveChanges])
    def set_timestamps(self):
        now = datetime.now(timezone.utc)
        if not self.created_at:
            self.created_at = now
        self.updated_at = now

    async def save(self, *args, **kwargs):
        now = datetime.now(timezone.utc)
        if not self.created_at:
            self.created_at = now
        self.updated_at = now
        return await super().save(*args, **kwargs)
    

    # No override of update(), as you manually set updatedAt in controller updates
