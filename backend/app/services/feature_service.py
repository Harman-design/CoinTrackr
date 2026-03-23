"""
app/services/feature_service.py
Feature engineering: growth, engagement, and hype score calculations.
All outputs are normalised to predictable ranges for the ML model.
"""

import logging
import math
from typing import List

logger = logging.getLogger(__name__)


def mentions_growth(current: int, previous: int) -> float:
    """
    Normalised mention growth using log-ratio → sigmoid.

    Returns value in [0, 1]:
      0.5 = no change | >0.5 = growth | <0.5 = decline
    """
    if previous <= 0:
        return 0.5

    raw = math.log((current + 1) / (previous + 1))
    normalised = round(1.0 / (1.0 + math.exp(-raw)), 4)
    logger.debug("mentions_growth(%d, %d) → %.4f", current, previous, normalised)
    return normalised


def engagement_score(posts: List[str]) -> float:
    """
    Proxy engagement from post volume and average text length.

    Formula:
        volume_component = min(post_count / 20, 1.0) * 0.7
        length_component = min(avg_length / 140, 1.0) * 0.3

    Returns value in [0, 1].
    """
    if not posts:
        return 0.0

    count = len(posts)
    avg_len = sum(len(p) for p in posts) / count

    score = round(
        min(count / 20.0, 1.0) * 0.7 + min(avg_len / 140.0, 1.0) * 0.3,
        4,
    )
    logger.debug("engagement_score(posts=%d, avg_len=%.1f) → %.4f", count, avg_len, score)
    return score


def calculate_hype_score(sentiment: float, growth: float, engagement: float) -> float:
    """
    Weighted hype score.

    Formula (exact spec):
        hype_score = 0.4 * growth + 0.3 * sentiment + 0.3 * engagement

    sentiment is raw [-1, +1], so score range is roughly [-0.3, 1.0].
    Values > 0.5 are generally bullish.
    """
    score = round((0.4 * growth) + (0.3 * sentiment) + (0.3 * engagement), 4)
    logger.debug(
        "hype_score(s=%.4f, g=%.4f, e=%.4f) → %.4f",
        sentiment, growth, engagement, score,
    )
    return score