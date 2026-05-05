import asyncio
import json

from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse

from database import get_db

router = APIRouter()

QUERY_LATEST_INVENTORY = """
    SELECT market_name, sell_price
    FROM inventory_item_price
    WHERE crawl_time = (SELECT MAX(crawl_time) FROM inventory_item_price)
      AND steam_id = ?
"""


@router.get("/history")
def inventory_history(steamId: str = Query(...)):
    db = get_db()
    rows = db.execute(QUERY_LATEST_INVENTORY, (steamId,)).fetchall()
    data = [dict(row) for row in rows]
    return {"status": "success", "data": data}


async def _sse_generator(steam_id: str):
    while True:
        db = get_db()
        rows = db.execute(QUERY_LATEST_INVENTORY, (steam_id,)).fetchall()
        data = [dict(row) for row in rows]
        yield f"data: {json.dumps(data, ensure_ascii=False)}\n\n"
        await asyncio.sleep(5)


@router.get("/realTime")
async def inventory_realtime(steamId: str = Query(...)):
    return StreamingResponse(
        _sse_generator(steamId),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )
