"""
app/models/schemas.py
Pydantic response schemas for all API endpoints.
"""

from pydantic import BaseModel


class HealthCheck(BaseModel):
    status: str
    version: str


class CoinList(BaseModel):
    coins: list[str]


class CoinAnalysis(BaseModel):
    coin: str
    sentiment: float
    growth: float
    engagement: float
    hype_score: float
    pump_probability: float
    signal: str
    explanation: str
    data_source: str          # "twitter+reddit" | "mock" | "twitter" | "reddit"
    posts_analysed: int