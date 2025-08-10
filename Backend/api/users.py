import bcrypt
from uuid import uuid4

from fastapi import APIRouter
from fastapi import Response
from fastapi import Request
from fastapi import HTTPException, status

from tortoise_models.user import User
from tortoise_models.session import Session

from pydantic_models.user_data import UserData

users_router = APIRouter()

@users_router.post("/user/register")
async def register_user(user_data: UserData, response: Response, request: Request):
    password_hash = bcrypt.hashpw(bytes(user_data.password, "utf-8"), 
                                  bcrypt.gensalt())

    existing_user: User | None = await User.get_or_none(
        login=user_data.login
    )

    if existing_user: # if we already have user
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this login already exists"
        )
    
    await User.create(
        name=user_data.name,
        login=user_data.login,
        password_hash=password_hash.decode("utf-8")
    )

    await login_user(user_data, response, request)

    return True
    

@users_router.post("/user/login")
async def login_user(user_data: UserData, response: Response, request: Request):
    existing_user: User | None = await User.get_or_none(
        login=user_data.login
    )

    if not existing_user: # if we don't have user
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if not bcrypt.checkpw( # if password is NOT correct
        bytes(user_data.password, "utf-8"), # compare given password
        bytes(existing_user.password_hash, "utf-8") # with hashed from DB
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect Password"
        )
    
    session_id: str = str(uuid4())

    user_ip: str = request.client.host if request.client else ""
    user_agent: str = request.headers.get("User-Agent", "")

    await Session.create(
        user_id=existing_user.id,
        session_id=session_id,
        user_ip=user_ip,
        user_agent=user_agent
    )

    response.set_cookie(
        key="session",
        value=session_id,
        httponly=False,
        samesite="lax",
    )

    return True

@users_router.post("/user/logout")
async def logout_user(request: Request):
    req_cookies = request.cookies.get("session", "")

    current_session: Session | None = await Session.get_or_none(
        session_id=req_cookies
    )

    if not current_session:
       return
    
    await current_session.delete()


@users_router.get("/user/checkExistSession")
async def check_exist_session(request: Request):
    req_cookies = request.cookies.get("session", "")

    current_session: Session | None = await Session.get_or_none(
        session_id=req_cookies
    )

    if not current_session:
        return False

    req_user_ip: str = request.client.host if request.client else ""
    req_user_agent: str = request.headers.get("User-Agent", "")

    s_user_ip = current_session.user_ip
    s_user_agent = current_session.user_agent

    print(f"req_user_ip: {req_user_ip} -- s_user_ip: {s_user_ip}")


    if req_user_agent != s_user_agent or req_user_ip != s_user_ip:
        print("Invalid IP or User-Agent")
        return False


    return True