"""
app/services/ml_service.py
Logistic Regression pump-probability predictor.
Trained once at startup on synthetic data and cached in memory.
Features: [sentiment_normalised (0-1), growth (0-1), engagement (0-1)]
"""

import logging
from functools import lru_cache
from typing import List

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline as SKPipeline
from sklearn.preprocessing import StandardScaler

logger = logging.getLogger(__name__)

# ── Synthetic training data ───────────────────────────────────────────────────
# [sentiment_norm, growth, engagement] → label (1=pump, 0=no pump)
_X = np.array([
    [0.95, 0.90, 0.85],  # very bullish
    [0.90, 0.88, 0.82],
    [0.85, 0.82, 0.78],
    [0.80, 0.78, 0.72],
    [0.75, 0.74, 0.68],
    [0.70, 0.70, 0.65],
    [0.65, 0.62, 0.58],  # mild bullish
    [0.60, 0.58, 0.54],
    [0.55, 0.54, 0.50],
    [0.50, 0.50, 0.50],  # neutral
    [0.45, 0.48, 0.45],
    [0.40, 0.44, 0.40],
    [0.35, 0.40, 0.36],  # bearish
    [0.30, 0.35, 0.30],
    [0.25, 0.30, 0.25],
    [0.20, 0.25, 0.22],
    [0.15, 0.20, 0.18],  # very bearish
    [0.10, 0.15, 0.12],
], dtype=float)

_Y = np.array(
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dtype=int,
)


@lru_cache(maxsize=1)
def _load_model() -> SKPipeline:
    """Train and cache the pump predictor."""
    logger.info("Training Logistic Regression pump predictor…")
    model = SKPipeline([
        ("scaler", StandardScaler()),
        ("clf", LogisticRegression(max_iter=1000, random_state=42)),
    ])
    model.fit(_X, _Y)
    logger.info("Pump predictor ready.")
    return model


def predict_pump(sentiment: float, growth: float, engagement: float) -> float:
    """
    Predict pump probability from the three engineered features.

    Args:
        sentiment:  Raw sentiment in [-1, +1].
        growth:     Normalised mention growth in [0, 1].
        engagement: Engagement score in [0, 1].

    Returns:
        Pump probability in [0, 1].
    """
    model = _load_model()
    # Normalise sentiment [-1,1] → [0,1] to match training features
    sentiment_norm = (sentiment + 1.0) / 2.0
    x = np.array([[sentiment_norm, growth, engagement]], dtype=float)
    proba = float(model.predict_proba(x)[0][1])
    logger.debug(
        "predict_pump(s=%.4f, g=%.4f, e=%.4f) → %.4f",
        sentiment, growth, engagement, proba,
    )
    return round(proba, 4)