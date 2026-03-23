"""
app/utils/signals.py
Human-readable signal and explanation generation.
"""


def get_signal(pump_probability: float) -> str:
    """
    Convert a pump probability into a trading signal label.

    Args:
        pump_probability: Model output in [0, 1].

    Returns:
        One of: "strong bullish", "bullish", "neutral", "bearish", "strong bearish"
    """
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
    """
    Build a short natural-language explanation of the analysis result.

    Args:
        sentiment:        Sentiment score in [-1, +1].
        growth:           Normalised mentions growth in [0, 1].
        engagement:       Engagement score in [0, 1].
        pump_probability: Model output in [0, 1].

    Returns:
        One or two sentence explanation string.
    """
    parts: list[str] = []

    # Sentiment commentary
    if sentiment >= 0.6:
        parts.append("Very positive community sentiment")
    elif sentiment >= 0.3:
        parts.append("Moderately positive sentiment")
    elif sentiment >= 0.0:
        parts.append("Slightly positive sentiment")
    else:
        parts.append("Negative sentiment detected")

    # Growth commentary
    if growth >= 0.75:
        parts.append("significant spike in mentions")
    elif growth >= 0.55:
        parts.append("above-average mention growth")
    elif growth >= 0.45:
        parts.append("stable mention volume")
    else:
        parts.append("declining mention volume")

    # Engagement commentary
    if engagement >= 0.7:
        parts.append("high engagement")
    elif engagement >= 0.5:
        parts.append("moderate engagement")
    else:
        parts.append("low engagement")

    summary = ", ".join(parts) + "."

    # Overall outlook
    if pump_probability >= 0.75:
        outlook = " Strong pump signals across all indicators."
    elif pump_probability >= 0.50:
        outlook = " Conditions favour an upward move."
    elif pump_probability >= 0.30:
        outlook = " Mixed signals – watch closely."
    else:
        outlook = " Weak pump conditions at this time."

    return summary + outlook