"""
app/routes/coins.py
Coin listing and analysis endpoints.
"""

import logging

from fastapi import APIRouter, HTTPException

from app.models.schemas import CoinAnalysis, CoinList
from app.services.sentiment_service import get_sentiment_score
from app.services.feature_service import (
    mentions_growth,
    engagement_score,
    calculate_hype_score,
)
from app.services.ml_service import predict_pump
from app.utils.mock_data import MOCK_COIN_DATA, SUPPORTED_COINS
from app.utils.signals import get_signal, build_explanation

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("", response_model=CoinList, summary="List supported coins")
def list_coins() -> CoinList:
    """
    Returns all meme coins currently supported by the analysis engine.
    """
    return CoinList(coins=SUPPORTED_COINS)


@router.get(
    "/analyze/{coin}",
    response_model=CoinAnalysis,
    summary="Analyse a meme coin for pump potential",
)
def analyze_coin(coin: str) -> CoinAnalysis:
    """
    Full AI-powered analysis pipeline for a single coin.

    Steps:
    1. Validate coin is supported.
    2. Run sentiment analysis on mock posts.
    3. Calculate mentions growth and engagement score.
    4. Predict pump probability with the ML model.
    5. Compute hype score.
    6. Return structured result with signal and explanation.
    """
    coin_upper = coin.upper()

    if coin_upper not in MOCK_COIN_DATA:
        raise HTTPException(
            status_code=404,
            detail=f"Coin '{coin_upper}' is not supported. "
                   f"Supported coins: {SUPPORTED_COINS}",
        )

    logger.info("Analysing coin: %s", coin_upper)
    data = MOCK_COIN_DATA[coin_upper]

    # --- Step 1: Sentiment ---
    sentiment = get_sentiment_score(data["posts"])
    logger.info("%s | sentiment=%.4f", coin_upper, sentiment)

    # --- Step 2: Mentions growth ---
    growth = mentions_growth(data["current_mentions"], data["previous_mentions"])
    logger.info("%s | growth=%.4f", coin_upper, growth)

    # --- Step 3: Engagement ---
    engagement = engagement_score(data["posts"])
    logger.info("%s | engagement=%.4f", coin_upper, engagement)

    # --- Step 4: ML pump probability ---
    # Normalise sentiment from [-1,1] → [0,1] for the model
    sentiment_norm = (sentiment + 1.0) / 2.0
    pump_probability = predict_pump([sentiment_norm, growth, engagement])
    logger.info("%s | pump_probability=%.4f", coin_upper, pump_probability)

    # --- Step 5: Hype score ---
    hype_score = calculate_hype_score(sentiment, growth, engagement)
    logger.info("%s | hype_score=%.4f", coin_upper, hype_score)

    # --- Step 6: Signal & explanation ---
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
    )