from tortoise import fields
from tortoise.models import Model

class Post(Model):
    id: int = fields.BigIntField(pk=True)
    username: str = fields.TextField(max_length=32)
    question: str = fields.TextField()
    answer: str = fields.TextField()

    class Meta:
        table = "posts"