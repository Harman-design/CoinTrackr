"""
app/services/sentiment_service.py
Sentiment analysis using HuggingFace DistilBERT pipeline.
Model is loaded once and cached for the process lifetime.
Cache folder is pinned to <project_root>/cache/
"""

import logging
import os
from functools import lru_cache
from pathlib import Path
from typing import List

from transformers import pipeline, Pipeline

logger = logging.getLogger(__name__)

# ── Pin HuggingFace cache to project root /cache ──────────────────────────────
_ROOT = Path(__file__).resolve().parents[3]        # project root (cointrakr/)
_CACHE_DIR = _ROOT / "cache"
_CACHE_DIR.mkdir(exist_ok=True)

os.environ["TRANSFORMERS_CACHE"] = str(_CACHE_DIR)
os.environ["HF_HOME"] = str(_CACHE_DIR)

_LABEL_SIGN = {"POSITIVE": 1.0, "NEGATIVE": -1.0}


@lru_cache(maxsize=1)
def _load_pipeline() -> Pipeline:
    """Load sentiment pipeline once and keep in memory."""
    logger.info("Loading HuggingFace sentiment pipeline (once only)…")
    return pipeline(
        "sentiment-analysis",
        model="distilbert-base-uncased-finetuned-sst-2-english",
        cache_dir=str(_CACHE_DIR),
        truncation=True,
        max_length=512,
    )


def get_sentiment_score(texts: List[str]) -> float:
    """
    Analyse a list of post texts and return average sentiment in [-1, +1].

    Args:
        texts: List of tweet / Reddit post strings.

    Returns:
        Average score: positive = bullish, negative = bearish.
    """
    if not texts:
        logger.warning("Empty text list passed to sentiment scorer – returning 0.0")
        return 0.0

    # Cap at 50 posts to keep inference fast during demo
    sample = texts[:50]

    try:
        pipe = _load_pipeline()
        results = pipe(sample)
    except Exception as exc:
        logger.error("Sentiment pipeline error: %s", exc)
        return 0.0

    scores: List[float] = []
    for result in results:
        sign = _LABEL_SIGN.get(result["label"].upper(), 1.0)
        scores.append(sign * result["score"])

    avg = sum(scores) / len(scores)
    logger.debug("Sentiment over %d texts → %.4f", len(scores), avg)
    return round(avg, 4)