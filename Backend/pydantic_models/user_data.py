from pydantic import BaseModel
from typing import Optional

class UserData(BaseModel):
    name: Optional[str] = None
    login: str
    password: str
