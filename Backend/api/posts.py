from fastapi import APIRouter
from tortoise_models.post import Post

from services import chatgpt
from g4f import models

from pydantic_models.postdata import PostData

router = APIRouter()

@router.get("/getPosts")
async def get_posts():
    posts = await Post.all()
    return posts

@router.post("/addPost")
async def add_post(post_data: PostData):
    success, answer = await chatgpt.send_request(post_data.question, 
                                                 models.gpt_4o_mini)

    if success:
        post = await Post.create(username=post_data.username, 
                                 question=post_data.question, answer=answer)
        await post.save()
    
        return True
    return False

@router.post("/getAnswer")
async def get_answer(prompt: str):
    answer = await chatgpt.send_request(prompt, models.gpt_4o_mini)
    return answer