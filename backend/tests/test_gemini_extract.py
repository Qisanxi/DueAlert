"""
Unit tests for the JSON extraction logic in gemini_service._extract_json.

These tests do NOT hit the network or require a real Gemini API key —
_extract_json is a pure string-in / dict-out function. The CI workflow
sets dummy FIREBASE_PROJECT_ID and GEMINI_API_KEY env vars so that
app.config.Settings() can be instantiated without failing on import.

Run with:
    cd backend
    FIREBASE_PROJECT_ID=dummy GEMINI_API_KEY=dummy python -m pytest tests/ -v
"""

import json

import pytest

from app.services.gemini_service import _extract_json


class TestExtractJsonDirect:
    def test_plain_json(self):
        text = '{"risk_score": 25, "predicted_payment_date": "2026-08-25", "message": "Namaste ji"}'
        out = _extract_json(text)
        assert out["risk_score"] == 25
        assert out["predicted_payment_date"] == "2026-08-25"
        assert out["message"] == "Namaste ji"

    def test_json_with_extra_whitespace(self):
        text = '  {  "risk_score" : 50 ,  "message" : "hi" }  '
        out = _extract_json(text)
        assert out["risk_score"] == 50
        assert out["message"] == "hi"


class TestExtractJsonMarkdownFences:
    def test_json_in_code_fence(self):
        text = '```json\n{"risk_score": 80, "message": "pay now"}\n```'
        out = _extract_json(text)
        assert out["risk_score"] == 80
        assert out["message"] == "pay now"

    def test_json_in_plain_code_fence(self):
        text = '```\n{"risk_score": 80, "message": "pay now"}\n```'
        out = _extract_json(text)
        assert out["risk_score"] == 80

    def test_json_with_preamble_and_fence(self):
        text = 'Here is the analysis:\n```json\n{"risk_score": 12, "predicted_payment_date": "2026-09-01", "message": "Reminder"}\n```\nThanks!'
        out = _extract_json(text)
        assert out["risk_score"] == 12
        assert out["predicted_payment_date"] == "2026-09-01"
        assert out["message"] == "Reminder"


class TestExtractJsonNestedObjects:
    """Regression tests for the non-greedy regex bug.

    The previous regex `\\{[\\s\\S]*?\\}` stopped at the FIRST `}` it found,
    which truncated any response containing nested objects (e.g.
    {"message": {"text": "..."}}) and produced invalid JSON. The fix uses
    a greedy `\\{[\\s\\S]*\\}` that captures the entire outermost object.
    """

    def test_nested_object(self):
        text = '{"risk_score": 30, "payload": {"note": "x"}}'
        out = _extract_json(text)
        assert out["risk_score"] == 30
        assert out["payload"] == {"note": "x"}

    def test_two_nested_objects(self):
        text = '{"a": {"b": 1}, "c": {"d": 2}, "risk_score": 99}'
        out = _extract_json(text)
        assert out["a"] == {"b": 1}
        assert out["c"] == {"d": 2}
        assert out["risk_score"] == 99

    def test_nested_array_of_objects(self):
        text = '{"risk_score": 5, "followups": [{"day": 1}, {"day": 2}]}'
        out = _extract_json(text)
        assert out["risk_score"] == 5
        assert out["followups"] == [{"day": 1}, {"day": 2}]


class TestExtractJsonRecovery:
    def test_trailing_comma_in_object(self):
        text = '{"risk_score": 25, "message": "hi",}'
        out = _extract_json(text)
        assert out["risk_score"] == 25
        assert out["message"] == "hi"

    def test_manual_keyvalue_fallback(self):
        # No valid JSON object structure — should fall through to the manual
        # key/value extractor, which only matches keys wrapped in double quotes
        # (matching Gemini's JSON-like output style).
        text = 'analysis: "risk_score": 42, "predicted_payment_date": "2026-12-31", "message": "Reminder please"'
        out = _extract_json(text)
        assert out["risk_score"] == 42
        assert out["predicted_payment_date"] == "2026-12-31"
        assert out["message"] == "Reminder please"

    def test_raises_on_completely_garbage(self):
        with pytest.raises(ValueError):
            _extract_json("totally unrelated text with no json keys at all")


class TestExtractJsonNumbers:
    def test_zero_risk_score(self):
        text = '{"risk_score": 0, "message": "ok"}'
        out = _extract_json(text)
        assert out["risk_score"] == 0

    def test_max_risk_score(self):
        text = '{"risk_score": 100, "message": "bad"}'
        out = _extract_json(text)
        assert out["risk_score"] == 100
