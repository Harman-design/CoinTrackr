"""
app/utils/config.py
Loads environment variables from .env file.
All API keys are read here; the rest of the app imports from this module.
"""

import os
from dotenv import load_dotenv

load_dotenv()  # reads .env file from project root


class Config:
    # Twitter / X
    TWITTER_BEARER_TOKEN: str | None = os.getenv("TWITTER_BEARER_TOKEN")

    # Reddit
    REDDIT_CLIENT_ID: str | None = os.getenv("REDDIT_CLIENT_ID")
    REDDIT_CLIENT_SECRET: str | None = os.getenv("REDDIT_CLIENT_SECRET")
    REDDIT_USER_AGENT: str = os.getenv("REDDIT_USER_AGENT", "CoinTrakrAI/2.0")

    @classmethod
    def has_twitter(cls) -> bool:
        return bool(cls.TWITTER_BEARER_TOKEN and cls.TWITTER_BEARER_TOKEN != "your_twitter_bearer_token_here")

    @classmethod
    def has_reddit(cls) -> bool:
        return bool(
            cls.REDDIT_CLIENT_ID
            and cls.REDDIT_CLIENT_SECRET
            and cls.REDDIT_CLIENT_ID != "your_reddit_client_id_here"
        )


config = Config()