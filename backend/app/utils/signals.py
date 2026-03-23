"""
app/utils/signals.py
Converts numeric scores into human-readable signal labels and explanations.
"""


def get_signal(pump_probability: float) -> str:
    """Map pump probability to a signal label."""
    if pump_probability >= 0.80:
        return "strong bullish"
    elif pump_probability >= 0.60:
        return "bullish"
    elif pump_probability >= 0.40:
        return "neutral"
    elif pump_probability >= 0.20:
        return "bearish"
    else:
        return "strong bearish"


def build_explanation(
    sentiment: float,
    growth: float,
    engagement: float,
    pump_probability: float,
) -> str:
    """Build a one-sentence natural language explanation of the analysis."""
    parts: list[str] = []

    if sentiment >= 0.6:
        parts.append("very positive community sentiment")
    elif sentiment >= 0.2:
        parts.append("moderately positive sentiment")
    elif sentiment >= 0.0:
        parts.append("slightly positive sentiment")
    else:
        parts.append("negative sentiment")

    if growth >= 0.75:
        parts.append("significant spike in social mentions")
    elif growth >= 0.55:
        parts.append("above-average mention growth")
    elif growth >= 0.45:
        parts.append("stable mention volume")
    else:
        parts.append("declining mention volume")

    if engagement >= 0.7:
        parts.append("high post engagement")
    elif engagement >= 0.5:
        parts.append("moderate engagement")
    else:
        parts.append("low engagement")

    summary = ", ".join(parts) + "."

    if pump_probability >= 0.75:
        outlook = " Strong pump signals detected across all indicators."
    elif pump_probability >= 0.55:
        outlook = " Conditions favour an upward price move."
    elif pump_probability >= 0.35:
        outlook = " Mixed signals — monitor closely."
    else:
        outlook = " Weak pump conditions at this time."

    return summary + outlook