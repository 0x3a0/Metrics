import os
import signal
import sys
from contextlib import asynccontextmanager

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from database import close_db, init_db
from exceptions import AppError
from routers import inventory, user

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield
    close_db()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/api/v1/user")
app.include_router(inventory.router, prefix="/api/v1/inventory")


@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError):
    return JSONResponse(status_code=exc.status_code, content=exc.body)


@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    return {"status": "error", "message": "404 Not Found!"}


if __name__ == "__main__":
    port = int(os.getenv("PORT", 9280))

    def handle_sigint(sig, frame):
        print("\n[backend] Server closed.")
        close_db()
        sys.exit(0)

    signal.signal(signal.SIGINT, handle_sigint)

    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
