from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from contextlib import asynccontextmanager

from api.posts import posts_router
from api.users import users_router

from database import init_db, close_db

import mimetypes

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()


app = FastAPI(lifespan=lifespan)

custom_mimetype = mimetypes.add_type("application/javascript", ".js", True) # ! Necessarily!!!

app.mount("/dist", StaticFiles(directory=r"dist"), name="static")  # ! Change the name of the directory to your's
templates = Jinja2Templates(directory="dist")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request}, media_type="text/html")

app.include_router(posts_router)
app.include_router(users_router)

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*", "http://localhost:5173/"],
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)