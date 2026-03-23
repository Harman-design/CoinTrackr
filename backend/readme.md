# CoinX – AI-Powered Meme Coin Trend Detection System

A clean, production-ready FastAPI backend for detecting meme coin pump
potential using Hugging Face sentiment analysis and a scikit-learn
Logistic Regression model.

---

## Project Structure

```
coinx/
├── main.py                        # FastAPI app factory & router registration
├── requirements.txt
├── README.md
└── app/
    ├── routes/
    │   ├── health.py              # GET /health
    │   └── coins.py               # GET /coins  |  GET /coins/analyze/{coin}
    ├── services/
    │   ├── sentiment_service.py   # HuggingFace sentiment pipeline
    │   ├── feature_service.py     # mentions_growth, engagement_score, hype_score
    │   └── ml_service.py          # Logistic Regression pump predictor
    ├── models/
    │   └── schemas.py             # Pydantic response models
    └── utils/
        ├── mock_data.py           # Hardcoded posts + mention counts per coin
        └── signals.py             # Signal labels & natural-language explanations
```

---

## Setup

```bash
# 1. Create virtual environment
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the server
uvicorn main:app --reload
```

The first request that hits the sentiment endpoint will download the
`distilbert-base-uncased-finetuned-sst-2-english` model (~250 MB).
Subsequent requests use the cached model in memory.

---

## API Endpoints

| Method | Path                     | Description                     |
|--------|--------------------------|---------------------------------|
| GET    | `/health`                | Liveness check                  |
| GET    | `/coins`                 | List supported coins            |
| GET    | `/coins/analyze/{coin}`  | Full AI analysis for a coin     |

### Example response – `GET /coins/analyze/DOGE`

```json
{
  "coin": "DOGE",
  "sentiment": 0.9321,
  "growth": 0.7934,
  "engagement": 0.72,
  "hype_score": 0.7437,
  "pump_probability": 0.8812,
  "signal": "strong bullish",
  "explanation": "Very positive community sentiment, significant spike in mentions, high engagement. Strong pump signals across all indicators."
}
```

---

## Supported Coins (mock data)

- **DOGE** – high growth, strong sentiment
- **PEPE** – strong growth spike
- **SHIBA** – stable, moderate signals

---

## Streamlit Integration

```python
import requests

BASE = "http://localhost:8000"

coins = requests.get(f"{BASE}/coins").json()["coins"]
result = requests.get(f"{BASE}/coins/analyze/DOGE").json()
```

---

## Pipeline Overview

```
Posts (mock) ──► HuggingFace Sentiment ──► sentiment score [-1,+1]
                                                      │
Mention counts ──► mentions_growth() ──► growth [0,1]│
                                                      │
Posts ──► engagement_score() ──► engagement [0,1] ───┤
                                                      │
                              ┌───────────────────────┤
                              ▼                        ▼
               Logistic Regression         calculate_hype_score()
               pump_probability [0,1]      hype_score [0,1]
                              │
                              ▼
                    signal + explanation
```