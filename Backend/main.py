from fastapi import FastAPI
from contextlib import asynccontextmanager
from api.posts import router
from fastapi.middleware.cors import CORSMiddleware
from database import init_db, close_db
import uvicorn

app = FastAPI()

app.include_router(router)

app.add_middleware(  # чтобы CORS работал
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.on_event("shutdown")
async def shutdown_event():
    await close_db()

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)