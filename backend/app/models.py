from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


# ─── Center Models ─────────────────────────────────────────
class CenterBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    owner_name: str = Field(..., min_length=2, max_length=200)
    owner_phone: str = Field(..., min_length=10, max_length=20)
    address: Optional[str] = Field(default="")


class CenterCreate(CenterBase):
    pass


class CenterResponse(CenterBase):
    id: str
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# ─── Student Models ────────────────────────────────────────
class StudentBase(BaseModel):
    center_id: str
    name: str = Field(..., min_length=1, max_length=200)
    phone: str = Field(..., min_length=10, max_length=20)
    parent_name: str = Field(..., min_length=1, max_length=200)
    course: str = Field(..., min_length=1, max_length=200)
    monthly_fee: float = Field(..., ge=0)
    due_amount: float = Field(..., ge=0)
    due_date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    notes: Optional[str] = Field(default="")


class StudentCreate(StudentBase):
    pass


class StudentUpdate(BaseModel):
    status: Optional[str] = Field(default=None, pattern=r"^(pending|message_sent|replied|paid)$")
    message_text: Optional[str] = None
    risk_score: Optional[int] = Field(default=None, ge=0, le=100)
    predicted_payment_date: Optional[str] = None


class StudentResponse(StudentBase):
    id: str
    status: str = "pending"
    risk_score: int = 0
    predicted_payment_date: Optional[str] = None
    message_text: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    message_sent_at: Optional[str] = None
    
    class Config:
        from_attributes = True


# ─── Message Models ────────────────────────────────────────
class BulkMessageRequest(BaseModel):
    center_id: str
    student_ids: List[str] = Field(..., min_length=1)


class MessageSendResponse(BaseModel):
    success: bool
    sent_count: int


# ─── Dashboard Models ──────────────────────────────────────
class DashboardStats(BaseModel):
    total_students: int = 0
    pending: int = 0
    message_sent: int = 0
    replied: int = 0
    paid: int = 0
    total_due: float = 0.0
    total_collected: float = 0.0
    collection_rate: float = 0.0
    high_risk_count: int = 0


class DashboardResponse(BaseModel):
    success: bool
    stats: DashboardStats


# ─── WhatsApp Models ───────────────────────────────────────
class WhatsAppLinkResponse(BaseModel):
    success: bool
    wa_link: str
    phone: str
    message: str


# ─── CSV Upload Response ───────────────────────────────────
class CSVUploadResponse(BaseModel):
    success: bool
    count: int
    students: List[StudentResponse]