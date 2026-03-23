"""
CoinTrakr AI – Meme Coin Trend Detection System
Entry point: starts FastAPI app and registers all routers.
"""

import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.reddit_pipeline import process_posts

from app.routes import coins, health

# ── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

# ── App ───────────────────────────────────────────────────────────────────────
from fastapi import FastAPI
from app.reddit_pipeline import process_posts   # 👈 IMPORTANT

app = FastAPI(
    title="CoinTrakr AI",
    description="Meme Coin Trend Detection – Twitter + Reddit + ML",
    version="2.0.0",
)

@app.get("/")
def home():
    return {"message": "Backend running 🚀"}

from fastapi import Query

@app.get("/reddit")
def get_reddit_data(coin: str = Query(None)):
    return process_posts(coin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(health.router, tags=["Health"])
app.include_router(coins.router, prefix="/coins", tags=["Coins"])

logger.info("CoinTrakr AI started successfully.")