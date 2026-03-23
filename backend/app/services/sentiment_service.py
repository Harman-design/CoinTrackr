"""
app/services/sentiment_service.py
Sentiment analysis using a Hugging Face transformers pipeline.

Model: distilbert-base-uncased-finetuned-sst-2-english
  – Lightweight, fast, no GPU required.
  – Outputs POSITIVE / NEGATIVE with a confidence score.

We map that to the [-1, +1] range expected by the rest of the system.
"""

import logging
from functools import lru_cache
from typing import List

from transformers import pipeline, Pipeline

logger = logging.getLogger(__name__)

# Label → sign multiplier
_LABEL_SIGN = {"POSITIVE": 1.0, "NEGATIVE": -1.0}


@lru_cache(maxsize=1)
def _load_pipeline() -> Pipeline:
    """Load the sentiment pipeline once and cache it for the process lifetime."""
    logger.info("Loading sentiment analysis pipeline (first call only)…")
    return pipeline(
        "sentiment-analysis",
        model="distilbert-base-uncased-finetuned-sst-2-english",
        truncation=True,
        max_length=512,
    )


def get_sentiment_score(texts: List[str]) -> float:
    """
    Analyse a list of text posts and return an average sentiment score.

    Args:
        texts: List of social-media post strings.

    Returns:
        Average sentiment in [-1, +1].
        Positive values → bullish sentiment.
        Negative values → bearish sentiment.
    """
    if not texts:
        logger.warning("get_sentiment_score called with empty list – returning 0.0")
        return 0.0

    sentiment_pipe = _load_pipeline()

    try:
        results = sentiment_pipe(texts)
    except Exception as exc:  # pragma: no cover
        logger.error("Sentiment pipeline error: %s", exc)
        return 0.0

    scores: List[float] = []
    for result in results:
        label: str = result["label"].upper()
        confidence: float = result["score"]
        sign = _LABEL_SIGN.get(label, 1.0)
        scores.append(sign * confidence)

    average = sum(scores) / len(scores)
    logger.debug("Sentiment scores: %s → average: %.4f", scores, average)
    return round(average, 4)