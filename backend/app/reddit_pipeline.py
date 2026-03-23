import requests
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

KEYWORDS = ["moon", "pump", "buy", "bullish"]

def fetch_reddit_posts():
    url = "https://www.reddit.com/r/CryptoMoonShots/new.json?limit=25"
    
    headers = {
        "User-Agent": "memescan/1.0"
    }

    response = requests.get(url, headers=headers)
    data = response.json()

    return data["data"]["children"]


def process_posts():
    posts = fetch_reddit_posts()

    results = []

    for post in posts:
        info = post["data"]

        title = info["title"]
        text = info["selftext"]
        score = info["score"]
        comments = info["num_comments"]

        combined_text = f"{title} {text}"

        # Keyword filter
        if any(kw in combined_text.lower() for kw in KEYWORDS):

            sentiment = analyzer.polarity_scores(combined_text)

            results.append({
                "title": title,
                "score": score,
                "comments": comments,
                "sentiment": sentiment["compound"]
            })

    return results