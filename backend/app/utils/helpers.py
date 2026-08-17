import re
import urllib.parse


def sanitize_phone(phone: str) -> str:
    return re.sub(r"\D", "", phone)


def build_whatsapp_link(phone: str, message: str) -> str:
    cleaned = sanitize_phone(phone)
    encoded = urllib.parse.quote(message)

    return f"https://wa.me/{cleaned}?text={encoded}"