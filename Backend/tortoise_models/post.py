from tortoise import fields
from tortoise.models import Model

class Post(Model):
    id: fields.Field[int] = fields.BigIntField(pk=True)
    username: fields.Field[str] = fields.TextField(max_length=32)
    question: fields.Field[str] = fields.TextField()
    answer: fields.Field[str] = fields.TextField()

    class Meta: # type: ignore
        table = "posts"