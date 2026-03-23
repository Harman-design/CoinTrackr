"""
app/data_sources/aggregator.py
Aggregates posts from Twitter and Reddit for a given coin.
Falls back to mock data if both APIs fail or are unconfigured.

Returns a unified result so the analysis pipeline doesn't care
about where the data came from.
"""

import logging
from dataclasses import dataclass
from typing import List

from app.data_sources.twitter_source import fetch_tweets
from app.data_sources.reddit_source import fetch_reddit_posts
from app.utils.mock_data import MOCK_DATA

logger = logging.getLogger(__name__)


@dataclass
class AggregatedData:
    posts: List[str]
    current_mentions: int
    previous_mentions: int
    data_source: str          # "twitter+reddit" | "twitter" | "reddit" | "mock"


def get_coin_data(coin: str) -> AggregatedData:
    """
    Fetch posts for a coin from Twitter and Reddit.
    Falls back to mock data if live APIs produce no results.

    Args:
        coin: Uppercase ticker, e.g. "DOGE"

    Returns:
        AggregatedData with posts, mention counts, and source label.
    """
    twitter_posts, twitter_count = fetch_tweets(coin)
    reddit_posts, reddit_count = fetch_reddit_posts(coin)

    all_posts = twitter_posts + reddit_posts
    total = twitter_count + reddit_count

    # ── Determine which sources are active ───────────────────────────────────
    sources = []
    if twitter_count > 0:
        sources.append("twitter")
    if reddit_count > 0:
        sources.append("reddit")

    # ── Fallback to mock if no live data ─────────────────────────────────────
    if not all_posts:
        logger.info("%s: no live data – using mock fallback", coin)
        mock = MOCK_DATA.get(coin, MOCK_DATA["DOGE"])
        return AggregatedData(
            posts=mock["posts"],
            current_mentions=mock["current_mentions"],
            previous_mentions=mock["previous_mentions"],
            data_source="mock",
        )

    # ── Use live data – simulate mention counts from post volume ─────────────
    # In production you'd store historical counts in a DB.
    # For the hackathon, we derive them from live post volume.
    current_mentions = total * 120       # rough multiplier: posts → estimated reach
    previous_mentions = int(current_mentions * 0.65)  # simulate ~35% growth baseline

    logger.info(
        "%s: collected %d posts (twitter=%d, reddit=%d)",
        coin, total, twitter_count, reddit_count,
    )

    return AggregatedData(
        posts=all_posts,
        current_mentions=current_mentions,
        previous_mentions=previous_mentions,
        data_source="+".join(sources) if sources else "mock",
    )   