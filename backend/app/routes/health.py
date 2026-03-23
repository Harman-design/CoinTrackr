"""
app/routes/health.py
Health check endpoint – used by Streamlit and load balancers.
"""

from fastapi import APIRouter
from app.models.schemas import HealthCheck
from app.utils.config import config

router = APIRouter()


@router.get("/health", response_model=HealthCheck)
def health_check() -> HealthCheck:
    """Returns API liveness status and active data source configuration."""
    sources = []
    if config.has_twitter():
        sources.append("twitter")
    if config.has_reddit():
        sources.append("reddit")
    if not sources:
        sources.append("mock-only")

    return HealthCheck(
        status="ok",
        version="2.0.0",
    )