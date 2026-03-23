"""
app/services/feature_service.py
Feature engineering for meme coin trend detection.
"""

import logging
import math
from typing import List

logger = logging.getLogger(__name__)


def mentions_growth(current: int, previous: int) -> float:
    """
    Calculate normalised mention growth between two periods.

    Uses a log-ratio so explosive growth doesn't dominate the feature space,
    then clamps the result to [0, 1] for downstream ML.

    Args:
        current:  Number of mentions in the current period.
        previous: Number of mentions in the previous period.

    Returns:
        Normalised growth score in [0, 1].
        0.5 means no change; closer to 1 = strong growth; closer to 0 = decline.
    """
    if previous <= 0:
        logger.warning("previous_mentions is 0 – returning neutral growth 0.5")
        return 0.5

    # log-ratio: 0 when unchanged, positive when growing, negative when shrinking
    raw = math.log((current + 1) / (previous + 1))

    # Normalise with a soft sigmoid so very large spikes don't saturate to exactly 1
    normalised = 1.0 / (1.0 + math.exp(-raw))
    result = round(normalised, 4)
    logger.debug("mentions_growth(%d, %d) → raw=%.4f, normalised=%.4f", current, previous, raw, result)
    return result


def engagement_score(posts: List[str]) -> float:
    """
    Proxy engagement score based on post volume and average length.

    In a production system you'd use likes/retweets/comments.
    Here we use:
        score = min(post_count / 10, 1.0) * 0.7
              + min(avg_length / 140, 1.0) * 0.3

    Args:
        posts: List of post text strings.

    Returns:
        Engagement score in [0, 1].
    """
    if not posts:
        return 0.0

    post_count = len(posts)
    avg_length = sum(len(p) for p in posts) / post_count

    volume_component = min(post_count / 10.0, 1.0) * 0.7
    length_component = min(avg_length / 140.0, 1.0) * 0.3

    result = round(volume_component + length_component, 4)
    logger.debug(
        "engagement_score: posts=%d, avg_len=%.1f → %.4f",
        post_count,
        avg_length,
        result,
    )
    return result


def calculate_hype_score(sentiment: float, growth: float, engagement: float) -> float:
    """
    Weighted hype score combining all three signals.

    Formula:
        hype_score = 0.4 * growth + 0.3 * sentiment_normalised + 0.3 * engagement

    Sentiment is in [-1, +1]; we normalise it to [0, 1] before combining.

    Args:
        sentiment:  Average sentiment score in [-1, +1].
        growth:     Normalised mention growth in [0, 1].
        engagement: Engagement score in [0, 1].

    Returns:
        Hype score. Values > 0.6 are generally bullish.
    """
    # Normalise sentiment from [-1,1] → [0,1]
    sentiment_normalised = (sentiment + 1.0) / 2.0

    score = (0.4 * growth) + (0.3 * sentiment_normalised) + (0.3 * engagement)
    result = round(score, 4)
    logger.debug(
        "calculate_hype_score(s=%.4f, g=%.4f, e=%.4f) → %.4f",
        sentiment,
        growth,
        engagement,
        result,
    )
    return result