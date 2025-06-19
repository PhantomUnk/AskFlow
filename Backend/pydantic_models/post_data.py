from pydantic import BaseModel

class PostData(BaseModel):
    username: str
    question: str
