from fastapi import APIRouter, HTTPException, Depends
from app.models import CenterCreate, CenterResponse
from app.services.center_service import get_center_service
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/centers", tags=["Centers"])


@router.post("", response_model=dict)
def create_center(center: CenterCreate, uid: str = Depends(get_current_user)):
    svc = get_center_service()
    # Pass the Pydantic model + uid separately
    created = svc.create(center, owner_uid=uid)
    return {"success": True, "center": created}


@router.get("/me", response_model=dict)
def get_my_center(uid: str = Depends(get_current_user)):
    svc = get_center_service()
    center = svc.get_by_owner(uid)
    if not center:
        raise HTTPException(status_code=404, detail="No center found")
    return {"success": True, "center": center}


@router.get("/{center_id}", response_model=dict)
def get_center(center_id: str):
    svc = get_center_service()
    center = svc.get(center_id)
    if not center:
        raise HTTPException(status_code=404, detail="Center not found")
    return {"success": True, "center": center}