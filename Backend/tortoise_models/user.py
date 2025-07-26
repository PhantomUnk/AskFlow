from tortoise import fields
from tortoise.fields import Field
from tortoise.models import Model

class User(Model):
    id: Field[int] = fields.BigIntField(pk=True)
    name: Field[str] = fields.TextField()
    login: Field[str] = fields.CharField(unique=True, index=True, max_length=128)
    password_hash: Field[str] = fields.TextField()

    class Meta: #type: ignore
        table = "users"