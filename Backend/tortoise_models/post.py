from tortoise import fields
from tortoise.fields import Field
from tortoise.models import Model

class Post(Model):
    id: Field[int] = fields.BigIntField(pk=True)
    username: Field[str] = fields.TextField(max_length=32)
    question: Field[str] = fields.TextField()
    answer: Field[str] = fields.TextField()

    class Meta: #type: ignore
        table = "posts"