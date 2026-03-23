"""
app/models/schemas.py
Pydantic models for API request/response shapes.
"""

from pydantic import BaseModel


class CoinAnalysis(BaseModel):
    coin: str
    sentiment: float
    growth: float
    engagement: float
    hype_score: float
    pump_probability: float
    signal: str
    explanation: str


class CoinList(BaseModel):
    coins: list[str]


class HealthCheck(BaseModel):
    status: str
    version: str