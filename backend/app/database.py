import json
import base64
import os
import firebase_admin
from firebase_admin import credentials, firestore
from app.config import settings

_db = None


def init_firebase():
    global _db
    if _db is not None:
        return _db
    
    # Try base64 env var first (Render production)
    b64_key = os.getenv("FIREBASE_KEY_BASE64")
    if b64_key:
        key_json = base64.b64decode(b64_key)
        cred = credentials.Certificate(json.loads(key_json))
    else:
        # Fallback to file (local dev)
        cred = credentials.Certificate(settings.FIREBASE_KEY_PATH)
    
    firebase_admin.initialize_app(cred, {
        "projectId": settings.FIREBASE_PROJECT_ID,
    })
    _db = firestore.client()
    return _db


def get_db() -> firestore.Client:
    if _db is None:
        return init_firebase()
    return _db