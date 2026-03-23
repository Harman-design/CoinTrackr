"""
app/utils/mock_data.py
Hardcoded mock social-media posts and mention counts per coin.
In a real system these would come from Twitter/Reddit scrapers.
"""

from typing import TypedDict


class CoinData(TypedDict):
    posts: list[str]
    current_mentions: int
    previous_mentions: int


MOCK_COIN_DATA: dict[str, CoinData] = {
    "DOGE": {
        "posts": [
            "DOGE to the moon! Such wow, much gains 🚀🚀🚀",
            "Elon tweeted again – DOGE is pumping hard right now!",
            "I just bought more DOGE, this thing is unstoppable",
            "DOGE community is the best in crypto, love this coin",
            "100x incoming on DOGE, mark my words frens",
            "DOGE looking very bullish on the 4H chart",
            "Why is everyone sleeping on DOGE? Massive breakout incoming",
            "Just converted half my portfolio to DOGE, LFG!",
        ],
        "current_mentions": 52000,
        "previous_mentions": 29000,
    },
    "PEPE": {
        "posts": [
            "PEPE is the next 100x, frog szn is here 🐸",
            "I love PEPE, the memes are top-tier and so is the chart",
            "PEPE just broke resistance – huge move incoming",
            "Bought a bag of PEPE last night, already up 30%",
            "PEPE trending on CT again, this is the one 🔥",
            "Don't sleep on PEPE, the frog always comes back",
            "PEPE community running strong, diamond hands only",
        ],
        "current_mentions": 38000,
        "previous_mentions": 15000,
    },
    "SHIBA": {
        "posts": [
            "SHIBA Army reporting for duty 🐕",
            "SHIBA burn rate increasing, supply shrinking fast",
            "Shibarium adoption is growing week over week",
            "SHIBA still one of the best meme coins out there",
            "Loaded up on SHIBA, long-term hold for me",
            "SHIBA whale alert – big wallet just accumulated",
            "The SHIBA ecosystem keeps expanding, bullish!",
            "SHIBA looking ready for a breakout, tight coil forming",
        ],
        "current_mentions": 41000,
        "previous_mentions": 38000,
    },
}

SUPPORTED_COINS: list[str] = list(MOCK_COIN_DATA.keys())