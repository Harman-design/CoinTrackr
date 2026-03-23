"""
Reddit Pipeline for CoinTrakr AI
- Fetches Reddit posts
- Filters by keywords + coin
- Computes sentiment
- Returns final scores
"""

import requests
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from app.services.scoring_service import calculate_scores

analyzer = SentimentIntensityAnalyzer()

# General crypto keywords
KEYWORDS = ["moon", "pump", "buy", "bullish"]

# Coin keywords
COIN_KEYWORDS = {
    "doge": ["doge", "dogecoin"],
    "pepe": ["pepe"],
    "shiba": ["shiba", "shib"]
}


def fetch_reddit_posts():
    url = "https://www.reddit.com/r/CryptoMoonShots/new.json?limit=25"

    headers = {
        "User-Agent": "memescan/1.0"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data["data"]["children"]
    except Exception as e:
        print(f"Error fetching Reddit data: {e}")
        return []


def process_posts(coin=None):
    posts = fetch_reddit_posts()
    results = []

    coin = coin.lower() if coin else None

    for post in posts:
        info = post["data"]

        title = info.get("title", "")
        text = info.get("selftext", "")
        score = info.get("score", 0)
        comments = info.get("num_comments", 0)

        combined_text = f"{title} {text}".lower()

        # 🔹 Keyword filter
        if not any(kw in combined_text for kw in KEYWORDS):
            continue

        # 🔹 Coin filter
        if coin:
            keywords = COIN_KEYWORDS.get(coin, [])
            if not keywords:
                continue
            if not any(kw in combined_text for kw in keywords):
                continue

        # 🔹 Sentiment
        sentiment = analyzer.polarity_scores(combined_text)["compound"]

        results.append({
            "title": title,
            "score": score,
            "comments": comments,
            "sentiment": sentiment
        })

    # 🔥 FINAL OUTPUT (scores instead of raw posts)
    return calculate_scores(results, coin)