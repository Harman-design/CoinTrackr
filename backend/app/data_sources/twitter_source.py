"""
app/data_sources/twitter_source.py
Fetches recent tweets for a given coin using Tweepy v2 (Bearer Token).
Falls back gracefully if the API key is missing or the request fails.
"""

import logging
from typing import List

import tweepy

from app.utils.config import config

logger = logging.getLogger(__name__)

# How many tweets to fetch per coin (keep low to stay within free tier limits)
MAX_TWEETS = 20

# Search queries per coin  –  combines hashtags and ticker symbols
COIN_QUERIES: dict[str, str] = {
    "DOGE":  "(#DOGE OR $DOGE OR dogecoin) lang:en -is:retweet",
    "PEPE":  "(#PEPE OR $PEPE OR pepecoin) lang:en -is:retweet",
    "SHIBA": "(#SHIBA OR $SHIB OR shibainucoin) lang:en -is:retweet",
    "WIF":   "(#WIF OR $WIF OR dogwifhat) lang:en -is:retweet",
    "FLOKI": "(#FLOKI OR $FLOKI OR flokiinu) lang:en -is:retweet",
}


def fetch_tweets(coin: str) -> tuple[List[str], int]:
    """
    Fetch recent tweets mentioning the given coin.

    Args:
        coin: Uppercase coin ticker, e.g. "DOGE"

    Returns:
        Tuple of (list_of_tweet_texts, tweet_count).
        Returns ([], 0) if API is unavailable or fails.
    """
    if not config.has_twitter():
        logger.info("Twitter API key not set – skipping Twitter fetch for %s", coin)
        return [], 0

    query = COIN_QUERIES.get(coin)
    if not query:
        logger.warning("No Twitter query defined for coin: %s", coin)
        return [], 0

    try:
        client = tweepy.Client(bearer_token=config.TWITTER_BEARER_TOKEN, wait_on_rate_limit=False)
        response = client.search_recent_tweets(
            query=query,
            max_results=MAX_TWEETS,
            tweet_fields=["text", "public_metrics"],
        )

        if not response.data:
            logger.info("No tweets returned for %s", coin)
            return [], 0

        texts = [tweet.text for tweet in response.data]
        logger.info("Fetched %d tweets for %s", len(texts), coin)
        return texts, len(texts)

    except tweepy.TooManyRequests:
        logger.warning("Twitter rate limit hit for %s – falling back to mock", coin)
        return [], 0
    except tweepy.TwitterServerError as exc:
        logger.error("Twitter server error for %s: %s", coin, exc)
        return [], 0
    except Exception as exc:
        logger.error("Unexpected Twitter error for %s: %s", coin, exc)
        return [], 0