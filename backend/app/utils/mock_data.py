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
            "DOGE is performing exceptionally well and I am very optimistic about its future",
            "I am extremely happy with my DOGE investment, the returns have been wonderful",
            "DOGE has a fantastic and supportive community, this coin is truly outstanding",
            "The price of DOGE is rising strongly and the outlook is very positive",
            "DOGE is showing great strength and I am confident it will continue to grow",
            "The DOGE ecosystem is expanding rapidly and the future looks very bright",
            "I am very excited about DOGE, the momentum is strong and consistently positive",
            "DOGE continues to deliver strong results and investor confidence is very high",
        ],
        "current_mentions": 52000,
        "previous_mentions": 29000,
    },
    "PEPE": {
        "posts": [
            "PEPE is an excellent coin with incredible growth potential and a great community",
            "I am very pleased with my PEPE investment, the gains have been outstanding",
            "PEPE just broke a major resistance level which is a very positive sign",
            "The PEPE community is strong and enthusiastic, this coin has a bright future",
            "PEPE is trending strongly and I believe it will continue to rise significantly",
            "I am confident in PEPE, the project is solid and the outlook is very good",
            "PEPE has delivered amazing returns and I am very happy with its performance",
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