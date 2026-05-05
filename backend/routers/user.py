import httpx
from fastapi import APIRouter
from pydantic import BaseModel

from database import get_db
from exceptions import AppError

router = APIRouter()


class BindAccountRequest(BaseModel):
    steam_id: str
    account_id: str
    persona_name: str
    avatar_url: str


class DeleteAccountRequest(BaseModel):
    steam_id: str


@router.get("/getAccount")
def get_account():
    db = get_db()
    rows = db.execute("SELECT * FROM users").fetchall()
    accounts = [dict(row) for row in rows]
    return {"status": "success", "message": {"accounts": accounts}}


@router.get("/searchAccount")
async def search_account(steam_id: str):
    url = f"https://my.steamchina.com/actions/ajaxresolveusers?steamids={steam_id}"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        data = resp.json()

    return {"status": "success", "message": data}


@router.post("/bindAccount")
def bind_account(body: BindAccountRequest):
    db = get_db()
    row = db.execute(
        "SELECT COUNT(*) as count FROM users WHERE steam_id = ?",
        (body.steam_id,),
    ).fetchone()

    if row["count"] > 0:
        raise AppError(
            status_code=400,
            body={
                "status": "error",
                "message": "账号已绑定",
                "code": "ACCOUNT_ALREADY_BOUND",
            },
        )

    try:
        db.execute(
            "INSERT INTO users(steam_id, account_id, persona_name, avatar_url) VALUES (?, ?, ?, ?)",
            (body.steam_id, str(body.account_id), body.persona_name, body.avatar_url),
        )
        db.commit()
    except Exception as e:
        if "UNIQUE constraint failed" in str(e):
            raise AppError(
                status_code=400,
                body={
                    "status": "error",
                    "message": "账号已绑定",
                    "code": "ACCOUNT_ALREADY_BOUND",
                },
            )
        raise

    return {"status": "success", "message": "绑定成功"}


@router.post("/deleteAccount")
def delete_account(body: DeleteAccountRequest):
    db = get_db()
    row = db.execute(
        "SELECT COUNT(*) as count FROM users WHERE steam_id = ?",
        (body.steam_id,),
    ).fetchone()

    if row["count"] == 0:
        raise AppError(
            status_code=404,
            body={
                "status": "error",
                "message": "账号不存在",
                "code": "ACCOUNT_NOT_FOUND",
            },
        )

    db.execute("DELETE FROM users WHERE steam_id = ?", (body.steam_id,))
    db.commit()

    return {"status": "success", "message": "账号已成功解绑"}
