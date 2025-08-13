from fastapi import APIRouter, Request, HTTPException, status
from tortoise_models.post import Post

from services import chatgpt
from g4f import models

from pydantic_models.post_data import PostData

from api.users import check_exist_session

posts_router = APIRouter()

@posts_router.get("/getPosts")
async def get_posts():
    posts = await Post.all()
    return posts

@posts_router.post("/addPost")
async def add_post(post_data: PostData, request: Request):
    if not await check_exist_session(request):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Current session is not more available!"
        )

    success, answer = await chatgpt.send_request(post_data.question, 
                                                 models.gpt_4o_mini)


    if success:
        post = await Post.create(username=post_data.username, 
                                 question=post_data.question, answer=answer)
        await post.save()
    
        return True
    return False

@posts_router.post("/getAnswer") # TODO убрать нахуй
async def get_answer(prompt: str):
    answer = await chatgpt.send_request(prompt, models.gpt_4o_mini)
    return answer