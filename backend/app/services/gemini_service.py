import json
import os
import re
from datetime import datetime
from google import genai
from google.genai import types
from app.config import settings

_client = None


def get_gemini_client() -> genai.Client:
    global _client
    if _client is None:
        _client = genai.Client(api_key=settings.GEMINI_API_KEY)
    return _client


def _extract_json(text: str) -> dict:
    """Aggressively extract JSON from Gemini's messy output."""
    text = text.strip()
    
    # Remove markdown fences
    for prefix in ("```json", "```"):
        if text.startswith(prefix):
            text = text[len(prefix):]
    if text.endswith("```"):
        text = text[:-3]
    text = text.strip()
    
    # Try direct parse first
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    
    # Try to find JSON object with regex
    match = re.search(r'\{[\s\S]*?\}', text)
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            pass
    
    # Try fixing common Gemini errors: trailing commas, unclosed strings
    try:
        # Remove trailing commas before } or ]
        fixed = re.sub(r',\s*([}\]])', r'\1', text)
        return json.loads(fixed)
    except json.JSONDecodeError:
        pass
    
    raise ValueError("Could not extract valid JSON from Gemini response")


async def analyze_student_with_gemini(student: dict) -> dict:
    prompt = f"""You are an expert fee collection analyst for Indian coaching centers.

            Student Data:
        - Name: {student['name']}
        - Parent: {student['parent_name']}
        - Course: {student['course']}
        - Monthly Fee: ₹{student['monthly_fee']}
        - Due Amount: ₹{student['due_amount']}
        - Due Date: {student['due_date']}
        - Notes: {student.get('notes', 'None')}

    Today's date: {datetime.now().strftime('%Y-%m-%d')}

    Tasks:
        1. Assign a risk score (0-100) where 100 = will never pay, 0 = will pay immediately.
        2. Predict the payment date (YYYY-MM-DD). If overdue, predict within next 7 days.
        3. Write an empathetic WhatsApp message in Hinglish (mix of Hindi and English). It should:
        - Be respectful and warm
        - Mention the due amount
        - Not sound robotic or threatening
        - Include a gentle reminder about the due date
        - End with a warm closing
        - Be under 300 characters
        - Include the parent's name naturally

        Return ONLY a JSON object in this exact format:
    {{"risk_score": 25, "predicted_payment_date": "2026-08-25", "message": "Namaste ji..."}}
    No markdown, no explanation, just raw JSON.
    """

    try:
        client = get_gemini_client()
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
                max_output_tokens=500,
            )
        )
        
        text = response.text
        result = _extract_json(text)
        
        return {
            "risk_score": max(0, min(100, int(result.get("risk_score", 50)))),
            "predicted_payment_date": result.get("predicted_payment_date", student["due_date"]),
            "message": result.get("message", ""),
        }
        
    except Exception as e:
        print(f"[GeminiService] Error analyzing {student.get('name')}: {e}")
        return {
            "risk_score": 50,
            "predicted_payment_date": student.get("due_date", ""),
            "message": (
                f"Namaste {student.get('parent_name', 'Sir/Madam')} ji, "
                f"{student.get('name', 'Student')} ka fee ₹{student.get('due_amount', 0)} "
                f"due date {student.get('due_date', '')} tak clear karna hai. "
                f"Kripya jaldi payment kar dein. Dhanyawad! 🙏"
            ),
        }