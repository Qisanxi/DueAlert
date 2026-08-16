from firebase_admin import firestore
from app.database import get_db
from app.models import CenterCreate, CenterResponse


class CenterService:
    def __init__(self):
        self.db = get_db()
        self.collection = self.db.collection("centers")
    
    def create(self, data: CenterCreate, owner_uid: str = "") -> CenterResponse:
        doc_ref = self.collection.document()
        payload = data.model_dump()
        payload["owner_uid"] = owner_uid
        payload["id"] = doc_ref.id
        payload["created_at"] = firestore.SERVER_TIMESTAMP
        
        doc_ref.set(payload)
        
        # Fetch back to get server timestamp
        doc = doc_ref.get()
        result = doc.to_dict()
        result["id"] = doc.id
        return CenterResponse(**result)
    
    def get(self, center_id: str) -> CenterResponse | None:
        doc = self.collection.document(center_id).get()
        if not doc.exists:
            return None
        data = doc.to_dict()
        data["id"] = doc.id
        return CenterResponse(**data)
    
    def get_by_owner(self, owner_uid: str) -> CenterResponse | None:
        """Get center by Firebase owner UID."""
        docs = self.collection.where("owner_uid", "==", owner_uid).limit(1).stream()
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            return CenterResponse(**data)
        return None

def get_center_service() -> CenterService:
    """Factory function for dependency injection."""
    return CenterService()