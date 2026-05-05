import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "data" / "userVal.db"

_connection: sqlite3.Connection | None = None


def init_db() -> None:
    global _connection
    _connection = sqlite3.connect(str(DB_PATH), check_same_thread=False)
    _connection.row_factory = sqlite3.Row

    _connection.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            steam_id     TEXT UNIQUE,
            account_id   TEXT,
            persona_name TEXT,
            avatar_url   TEXT
        );

        CREATE TABLE IF NOT EXISTS inventory_item_price (
            classid          TEXT,
            instanceid       TEXT,
            name             TEXT,
            market_name      TEXT,
            market_hash_name TEXT,
            sell_price       TEXT,
            sell_count       INTEGER,
            price_source     TEXT,
            steam_id         TEXT,
            account_id       TEXT,
            crawl_time       TEXT
        );

        CREATE TABLE IF NOT EXISTS inventory (
            appid            INTEGER,
            classid          TEXT NOT NULL,
            instanceid       TEXT NOT NULL,
            background_color TEXT,
            icon_url         TEXT,
            descriptions     TEXT,
            name             TEXT,
            name_color       TEXT,
            type             TEXT,
            market_name      TEXT,
            market_hash_name TEXT,
            tag              TEXT,
            steam_id         TEXT,
            account_id       TEXT,
            crawl_time       TEXT
        );
    """)
    print("[backend] Database initialized")


def get_db() -> sqlite3.Connection:
    if _connection is None:
        raise RuntimeError("Database not initialized. Call init_db() first.")
    return _connection


def close_db() -> None:
    global _connection
    if _connection:
        _connection.close()
        _connection = None
        print("[backend] Database closed")
