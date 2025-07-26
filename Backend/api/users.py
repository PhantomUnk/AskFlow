import bcrypt
from uuid import uuid4
import asyncio

from fastapi import APIRouter
from fastapi import Response
from fastapi import HTTPException

from tortoise_models.user import User
from tortoise_models.session import Session

from pydantic_models.user_data import UserData

users_router = APIRouter()

@users_router.post("/user/register")
async def register_user(user_data: UserData, response: Response):
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

    await login_user(user_data, response=response)

    return True
    

@users_router.post("/user/login")
async def login_user(user_data: UserData, response: Response):
    existing_user: User | None = await User.get_or_none(
        login=user_data.login
    )

    if not existing_user: # if we don't have user
        return False
    
    if not bcrypt.checkpw( # if password is NOT correct
        bytes(user_data.password, "utf-8"), # compare given password
        bytes(existing_user.password_hash, "utf-8") # with hashed from DB
    ):
        return False
    
    session_id = str(uuid4())

    await Session.create(
        user_id=existing_user.id,
        session_id=session_id
    )

    response.set_cookie(
        key="session",
        value=session_id,
        httponly=True,
        samesite="lax"
    )

    return True
    

@users_router.get("/user/getUserByID/{id}")
async def get_user_byID(id: int):
    return await User.get_or_none(id=id)

@users_router.get("/user/getUserBySessionID/{session_id}")
async def get_user_by_session_id(session_id: str):
    session: Session | None = await Session.get_or_none(
        session_id=session_id
    )

    if session is None:
        return None

    return await User.get_or_none(id=session.user_id)