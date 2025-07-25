from pydantic import BaseModel

class UserData(BaseModel):
    name: str
    login: str
    password: str
