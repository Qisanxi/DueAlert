from fastapi import Header, HTTPException
from firebase_admin import auth
from app.database import get_db


async def get_current_user(authorization: str = Header(None)) -> str:
    """Verify Firebase ID token and return user UID."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    
    token = authorization[7:]
    try:
        decoded = auth.verify_id_token(token, clock_skew_seconds=60)
        return decoded["uid"]
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid authentication token: {str(e)}")


async def get_current_center(authorization: str = Header(None)) -> str:
    """Get center_id for the authenticated user."""
    uid = await get_current_user(authorization)
    db = get_db()
    
    centers = db.collection("centers").where("owner_uid", "==", uid).limit(1).stream()
    for doc in centers:
        return doc.id
    
    raise HTTPException(status_code=404, detail="No center found for this user. Please create a center first.")