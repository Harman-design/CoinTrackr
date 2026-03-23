"""
app/services/ml_service.py
Logistic Regression pump-probability predictor.

Trained on a small synthetic dataset at import time.
In production, serialise the trained model with joblib and load from disk.
"""

import logging
from functools import lru_cache
from typing import List

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline as SKPipeline

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Synthetic training data
# Features: [sentiment_normalised, growth, engagement]
# Label:    1 = pump likely, 0 = no pump
# ---------------------------------------------------------------------------
_TRAIN_X = np.array(
    [
        # sentiment_norm, growth, engagement  →  label
        [0.9, 0.85, 0.80],   # very bullish
        [0.85, 0.90, 0.75],  # very bullish
        [0.80, 0.78, 0.70],  # bullish
        [0.75, 0.82, 0.65],  # bullish
        [0.70, 0.72, 0.68],  # bullish
        [0.65, 0.60, 0.55],  # mild
        [0.60, 0.55, 0.50],  # mild
        [0.55, 0.52, 0.48],  # mild
        [0.50, 0.50, 0.50],  # neutral
        [0.45, 0.48, 0.45],  # neutral
        [0.40, 0.42, 0.40],  # slightly bearish
        [0.35, 0.38, 0.35],  # bearish
        [0.30, 0.32, 0.30],  # bearish
        [0.25, 0.28, 0.25],  # bearish
        [0.20, 0.22, 0.20],  # very bearish
        [0.15, 0.18, 0.15],  # very bearish
        [0.10, 0.12, 0.10],  # very bearish
    ],
    dtype=float,
)

_TRAIN_Y = np.array(
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dtype=int,
)


@lru_cache(maxsize=1)
def _load_model() -> SKPipeline:
    """Train the model once and cache it for the process lifetime."""
    logger.info("Training Logistic Regression pump predictor…")
    model = SKPipeline(
        [
            ("scaler", StandardScaler()),
            ("clf", LogisticRegression(max_iter=1000, random_state=42)),
        ]
    )
    model.fit(_TRAIN_X, _TRAIN_Y)
    logger.info("Pump predictor trained successfully.")
    return model


def predict_pump(features: List[float]) -> float:
    """
    Predict the probability of a meme coin pump.

    Args:
        features: [sentiment_normalised (0-1), growth (0-1), engagement (0-1)]

    Returns:
        Pump probability in [0, 1].
    """
    model = _load_model()
    x = np.array(features, dtype=float).reshape(1, -1)
    proba: float = model.predict_proba(x)[0][1]  # probability of class 1
    result = round(float(proba), 4)
    logger.debug("predict_pump(%s) → %.4f", features, result)
    return result