from fastapi import APIRouter, HTTPException, Depends
from app.models import BulkMessageRequest, MessageSendResponse
from app.services.student_service import get_student_service
from app.utils.helpers import build_whatsapp_link
from app.dependencies import get_current_center

router = APIRouter(prefix="/api/messages", tags=["Messages"])


@router.post("/send", response_model=MessageSendResponse)
async def send_messages(req: BulkMessageRequest, center_id: str = Depends(get_current_center)):
    svc = get_student_service()
    # Verify all students belong to this center
    for sid in req.student_ids:
        student = svc.get(sid)
        if not student or student.center_id != center_id:
            raise HTTPException(status_code=403, detail="Unauthorized access to student")
    
    sent = svc.mark_messages_sent(center_id, req.student_ids)
    return MessageSendResponse(success=True, sent_count=sent)


@router.get("/whatsapp-link/{student_id}", response_model=dict)
def get_whatsapp_link(student_id: str, center_id: str = Depends(get_current_center)):
    svc = get_student_service()
    student = svc.get(student_id)
    if not student or student.center_id != center_id:
        raise HTTPException(status_code=404, detail="Student not found")
    
    link = build_whatsapp_link(student.phone, student.message_text or "")
    
    return {
        "success": True,
        "wa_link": link,
        "phone": student.phone,
        "message": student.message_text or "",
    }