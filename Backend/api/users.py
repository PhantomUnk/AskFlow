import bcrypt

from fastapi import APIRouter
from tortoise_models.user import User

from pydantic_models.user_data import UserData

users_router = APIRouter()

@users_router.post("/user/register")
async def register_user(user_data: UserData):
    password_hash = bcrypt.hashpw(bytes(user_data.password, "utf-8"), 
                                  bcrypt.gensalt())

    existing_user: User | None = await User.get_or_none(
        login=user_data.login
    )

    if existing_user: # if we already have user
        return False
    
    await User.create(
        name=user_data.name,
        login=user_data.login,
        password_hash=password_hash.decode("utf-8")
    )

    return True
    

@users_router.post("/user/login")
async def login_user(user_data: UserData):
    existing_user: User | None = await User.get_or_none(
        login=user_data.login
    )

    if not existing_user: # if we don't have user
        return False
    
    if bcrypt.checkpw(
        bytes(user_data.password, "utf-8"), # compare given password
        bytes(existing_user.password_hash, "utf-8") # with hashed from DB
    ):
        return True
    return False
    

@users_router.post("/user/getUser/{id}")
async def get_user_byID(id: int):
    return await User.filter(id=id).first()