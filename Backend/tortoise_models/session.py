from tortoise import fields
from tortoise.fields import Field
from tortoise.models import Model

class Session(Model):
    id: Field[int] = fields.BigIntField(pk=True)
    user_id: Field[int] = fields.BigIntField(index=True)
    session_id: Field[str] = fields.CharField(unique=True, index=True, max_length=128)
    user_ip: Field[str] = fields.CharField(max_length=128)
    user_agent: Field[str] = fields.CharField(max_length=128)

    class Meta: #type: ignore
        table = "sessions"