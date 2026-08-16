import urllib.parse


def build_whatsapp_link(phone: str, message: str) -> str:
    """Generate wa.me click-to-chat link."""
    cleaned = phone.replace("+", "").replace(" ", "").replace("-", "")
    encoded = urllib.parse.quote(message)
    return f"https://wa.me/{cleaned}?text={encoded}"


def sanitize_phone(phone: str) -> str:
    return phone.replace("+", "").replace(" ", "").replace("-", "")