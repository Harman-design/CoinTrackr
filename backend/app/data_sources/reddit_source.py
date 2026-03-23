"""
app/data_sources/reddit_source.py
Fetches recent Reddit posts mentioning a coin using PRAW.
Searches r/CryptoCurrency and r/memecoins for relevant posts.
Falls back gracefully if credentials are missing or requests fail.
"""

import logging
from typing import List

import praw
from praw.exceptions import PRAWException

from app.utils.config import config

logger = logging.getLogger(__name__)

# Subreddits to search
SUBREDDITS = ["CryptoCurrency", "memecoins", "SatoshiStreetBets", "altcoin"]

# How many posts to fetch per subreddit
MAX_POSTS = 10

# Search keywords per coin
COIN_KEYWORDS: dict[str, str] = {
    "DOGE":  "DOGE OR dogecoin",
    "PEPE":  "PEPE OR pepecoin",
    "SHIBA": "SHIBA OR SHIB OR shibainucoin",
    "WIF":   "WIF OR dogwifhat",
    "FLOKI": "FLOKI OR flokiinu",
}


def _get_client() -> praw.Reddit:
    """Create and return a read-only PRAW Reddit client."""
    return praw.Reddit(
        client_id=config.REDDIT_CLIENT_ID,
        client_secret=config.REDDIT_CLIENT_SECRET,
        user_agent=config.REDDIT_USER_AGENT,
    )


def fetch_reddit_posts(coin: str) -> tuple[List[str], int]:
    """
    Fetch recent Reddit posts mentioning the given coin.

    Args:
        coin: Uppercase coin ticker, e.g. "DOGE"

    Returns:
        Tuple of (list_of_post_texts, post_count).
        Returns ([], 0) if API is unavailable or fails.
    """
    if not config.has_reddit():
        logger.info("Reddit API keys not set – skipping Reddit fetch for %s", coin)
        return [], 0

    keyword = COIN_KEYWORDS.get(coin)
    if not keyword:
        logger.warning("No Reddit keyword defined for coin: %s", coin)
        return [], 0

    texts: List[str] = []

    try:
        reddit = _get_client()

        for subreddit_name in SUBREDDITS:
            subreddit = reddit.subreddit(subreddit_name)
            for post in subreddit.search(keyword, sort="new", limit=MAX_POSTS):
                # Combine title + body for richer sentiment signal
                content = post.title
                if post.selftext and post.selftext not in ("[removed]", "[deleted]"):
                    content += " " + post.selftext[:200]  # cap body length
                texts.append(content.strip())

        logger.info("Fetched %d Reddit posts for %s", len(texts), coin)
        return texts, len(texts)

    except PRAWException as exc:
        logger.error("PRAW error for %s: %s", coin, exc)
        return [], 0
    except Exception as exc:
        logger.error("Unexpected Reddit error for %s: %s", coin, exc)
        return [], 0