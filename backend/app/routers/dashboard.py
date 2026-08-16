from fastapi import APIRouter, Depends
from app.services.dashboard_service import get_dashboard_service
from app.dependencies import get_current_center

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/me", response_model=dict)
def get_dashboard(center_id: str = Depends(get_current_center)):
    svc = get_dashboard_service()
    result = svc.get_stats(center_id)
    return result.model_dump()  # ← Convert Pydantic model to dict