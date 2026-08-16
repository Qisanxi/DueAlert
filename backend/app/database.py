import firebase_admin
from firebase_admin import credentials, firestore
from app.config import settings

# Singleton Firestore client
_db = None


def init_firebase():
    global _db
    if _db is not None:
        return _db
    
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