"""
app/routes/coins.py
Coin listing and full AI analysis endpoints.

GET /coins              – list supported coins
GET /coins/analyze/{coin} – full pipeline: fetch → sentiment → ML → hype score
"""

import logging
from fastapi import APIRouter, HTTPException

from app.models.schemas import CoinAnalysis, CoinList
from app.data_sources.aggregator import get_coin_data
from app.services.sentiment_service import get_sentiment_score
from app.services.feature_service import (
    mentions_growth,
    engagement_score,
    calculate_hype_score,
)
from app.services.ml_service import predict_pump
from app.utils.mock_data import SUPPORTED_COINS
from app.utils.signals import get_signal, build_explanation

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("", response_model=CoinList)
def list_coins() -> CoinList:
    """Returns all coins supported by the analysis engine."""
    return CoinList(coins=SUPPORTED_COINS)


@router.get("/analyze/{coin}", response_model=CoinAnalysis)
def analyze_coin(coin: str) -> CoinAnalysis:
    """
    Full analysis pipeline for a single meme coin.

    Steps:
      1. Fetch posts from Twitter + Reddit (fallback to mock)
      2. Run HuggingFace sentiment analysis
      3. Calculate mentions growth
      4. Calculate engagement score
      5. Predict pump probability (Logistic Regression)
      6. Calculate hype score
      7. Return structured JSON with signal + explanation
    """
    coin_upper = coin.upper()

    if coin_upper not in SUPPORTED_COINS:
        raise HTTPException(
            status_code=404,
            detail=f"'{coin_upper}' is not supported. Supported: {SUPPORTED_COINS}",
        )

    logger.info("── Analysing %s ──────────────────────────────", coin_upper)

    # ── Step 1: Fetch data ────────────────────────────────────────────────────
    data = get_coin_data(coin_upper)
    logger.info("%s | source=%s | posts=%d", coin_upper, data.data_source, len(data.posts))

    # ── Step 2: Sentiment ─────────────────────────────────────────────────────
    sentiment = get_sentiment_score(data.posts)
    logger.info("%s | sentiment=%.4f", coin_upper, sentiment)

    # ── Step 3: Mentions growth ───────────────────────────────────────────────
    growth = mentions_growth(data.current_mentions, data.previous_mentions)
    logger.info("%s | growth=%.4f", coin_upper, growth)

    # ── Step 4: Engagement ────────────────────────────────────────────────────
    engagement = engagement_score(data.posts)
    logger.info("%s | engagement=%.4f", coin_upper, engagement)

    # ── Step 5: ML pump probability ───────────────────────────────────────────
    pump_probability = predict_pump(sentiment, growth, engagement)
    logger.info("%s | pump_probability=%.4f", coin_upper, pump_probability)

    # ── Step 6: Hype score ────────────────────────────────────────────────────
    hype_score = calculate_hype_score(sentiment, growth, engagement)
    logger.info("%s | hype_score=%.4f", coin_upper, hype_score)

    # ── Step 7: Signal + explanation ──────────────────────────────────────────
    signal = get_signal(pump_probability)
    explanation = build_explanation(sentiment, growth, engagement, pump_probability)

    return CoinAnalysis(
        coin=coin_upper,
        sentiment=round(sentiment, 4),
        growth=round(growth, 4),
        engagement=round(engagement, 4),
        hype_score=round(hype_score, 4),
        pump_probability=round(pump_probability, 4),
        signal=signal,
        explanation=explanation,
        data_source=data.data_source,
        posts_analysed=len(data.posts),
    )