"""
app/utils/mock_data.py
Fallback mock data used when Twitter / Reddit APIs are unavailable.
Posts use plain English so DistilBERT scores them accurately.
"""

from typing import TypedDict


class CoinMock(TypedDict):
    posts: list[str]
    current_mentions: int
    previous_mentions: int


MOCK_DATA: dict[str, CoinMock] = {
    "DOGE": {
    "posts": [
        "DOGE is performing well but I am unsure if it can sustain this growth",
        "I made good profits on DOGE but it feels a bit overhyped now",
        "DOGE community is strong but the fundamentals are still questionable",
        "The price is rising but corrections could happen soon",
        "DOGE has momentum but I would be cautious entering now",
        "Some investors are very optimistic but others are warning of a dump",
        "DOGE is trending but volatility is high",
        "Mixed opinions on DOGE right now, not entirely bullish"
    ],
        "current_mentions": 52000,
        "previous_mentions": 29000,
    },
    "PEPE": {
        "posts": [
            "PEPE is pumping but I think it might be short lived",
            "Huge hype around PEPE but feels risky",
            "Some traders are bullish but many are skeptical",
            "PEPE could rise more but also crash quickly",
            "Not sure if PEPE has long term value",
            "PEPE is trending but sentiment is mixed",
        ],
        "current_mentions": 38000,
        "previous_mentions": 15000,
    },
    "SHIBA": {
        "posts": [
            "SHIBA is a wonderful project with a very dedicated and passionate community",
            "The SHIBA burn rate is increasing which is great news for long term holders",
            "Shibarium adoption is growing steadily and the ecosystem is improving nicely",
            "SHIBA remains one of the most reliable and well supported coins available",
            "I am happy holding SHIBA for the long term, the fundamentals look strong",
            "A large wallet just accumulated SHIBA which is a very positive signal",
            "The SHIBA ecosystem keeps expanding and the future looks very promising",
            "SHIBA is showing strong technical signals and I am optimistic about growth",
        ],
        "current_mentions": 41000,
        "previous_mentions": 38000,
    },
    "WIF": {
        "posts": [
            "WIF is one of the most exciting new coins and the community is very enthusiastic",
            "I am very happy with my WIF position, the price action has been outstanding",
            "WIF has been performing brilliantly and the sentiment is extremely positive",
            "The WIF project is solid and I am very confident in its long term potential",
            "WIF is gaining strong momentum and I believe it will continue rising sharply",
            "I love the WIF community, they are passionate and the project is excellent",
        ],
        "current_mentions": 29000,
        "previous_mentions": 11000,
    },
    "FLOKI": {
        "posts": [
            "FLOKI is an excellent project with real utility and a very strong community",
            "I am optimistic about FLOKI, the team keeps delivering and the future is bright",
            "FLOKI has been showing very positive momentum and the chart looks great",
            "The FLOKI ecosystem is expanding rapidly and I am very pleased with progress",
            "FLOKI remains a wonderful long term hold and the fundamentals are strong",
            "I am very confident in FLOKI, the project continues to grow impressively",
        ],
        "current_mentions": 21000,
        "previous_mentions": 17000,
    },
}

SUPPORTED_COINS: list[str] = list(MOCK_DATA.keys())