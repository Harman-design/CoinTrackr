"""
Scoring Service for CoinTrakr AI
Calculates sentiment, hype, and pump probability
"""

def calculate_scores(posts, coin=None):
    total_sentiment = 0
    total_engagement = 0
    count = len(posts)

    if count == 0:
        return {
            "coin": coin or "ALL",
            "sentiment_score": 0,
            "hype_score": 0,
            "pump_probability": 0,
            "signal": "NO DATA"
        }

    for post in posts:
        total_sentiment += post["sentiment"]
        total_engagement += post["score"] + post["comments"]

    # 🔹 Average sentiment (-1 to 1)
    avg_sentiment = total_sentiment / count

    # 🔹 Convert to 0–100
    sentiment_score = (avg_sentiment + 1) * 50

    # 🔹 Normalize hype
    hype_score = min(total_engagement / 1000, 1.0) * 100

    # 🔥 Final score
    pump_probability = (sentiment_score * 0.6) + (hype_score * 0.4)

    # 🔥 Signal
    if pump_probability >= 70:
        signal = "BUY 🚀"
    elif pump_probability >= 50:
        signal = "WATCH 👀"
    else:
        signal = "SELL ❌"

    return {
        "coin": coin.upper() if coin else "ALL",
        "posts_analyzed": count,
        "sentiment_score": round(sentiment_score, 2),
        "hype_score": round(hype_score, 2),
        "pump_probability": round(pump_probability, 2),
        "signal": signal
    }