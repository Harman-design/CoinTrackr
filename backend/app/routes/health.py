"""
app/routes/health.py
Health-check endpoint.
"""

from fastapi import APIRouter
from app.models.schemas import HealthCheck

router = APIRouter()


@router.get("/health", response_model=HealthCheck, summary="Health check")
def health_check() -> HealthCheck:
    """
    Returns API health status.
    Used by load balancers, k8s probes, and Streamlit connectivity checks.
    """
    return HealthCheck(status="ok", version="1.0.0")