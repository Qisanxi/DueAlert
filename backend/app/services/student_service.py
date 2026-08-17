import asyncio
from datetime import datetime
from io import StringIO
from firebase_admin import firestore
import pandas as pd
from fastapi import UploadFile
from app.database import get_db
from app.models import StudentCreate, StudentResponse, StudentUpdate, CSVUploadResponse
from app.services.gemini_service import analyze_student_with_gemini


class StudentService:
    def __init__(self):
        self.db = get_db()
        self.collection = self.db.collection("students")
    
    async def create(self, data: StudentCreate) -> StudentResponse:
        """Create a single student with Gemini analysis."""
        student_dict = data.model_dump()
        student_dict["created_at"] = datetime.now().isoformat()
        student_dict["status"] = "pending"
        student_dict["message_text"] = ""
        student_dict["risk_score"] = 0
        student_dict["predicted_payment_date"] = ""
        
        
        # AI Analysis
        analysis = await analyze_student_with_gemini(student_dict)
        student_dict.update(analysis)
        # Gemini returns "message", model expects "message_text"
        if "message" in student_dict and not student_dict.get("message_text"):
            student_dict["message_text"] = student_dict.pop("message")
        
        # Save
        doc_ref = self.collection.document()
        student_dict["id"] = doc_ref.id
        doc_ref.set(student_dict)
        
        return StudentResponse(**student_dict)
    
    async def bulk_upload(self, center_id: str, file: UploadFile) -> CSVUploadResponse:
        """Upload CSV and create students with AI analysis. Survives individual failures."""
        contents = await file.read()
        df = pd.read_csv(StringIO(contents.decode("utf-8")))
        
        required = [
            "name", "phone", "parent_name", "course",
            "monthly_fee", "due_amount", "due_date"
        ]
        missing = [c for c in required if c not in df.columns]
        if missing:
            raise ValueError(f"Missing columns: {', '.join(missing)}")
        
        # Drop completely empty rows
        df = df.dropna(subset=["name", "phone", "due_amount"])
        
        created = []
        failed = []
        
        async def process_row(idx, row):
            try:
                student_dict = {
                    "center_id": center_id,
                    "name": str(row["name"]),
                    "phone": str(row["phone"]),
                    "parent_name": str(row["parent_name"]),
                    "course": str(row["course"]),
                    "monthly_fee": float(row["monthly_fee"]),
                    "due_amount": float(row["due_amount"]),
                    "due_date": str(row["due_date"]),
                    "notes": str(row.get("notes", "")),
                    "created_at": datetime.now().isoformat(),
                    "status": "pending",
                }
                
                analysis = await analyze_student_with_gemini(student_dict)
                student_dict.update(analysis)
                if "message" in student_dict and not student_dict.get("message_text"):
                        student_dict["message_text"] = student_dict.pop("message")
                
                doc_ref = self.collection.document()
                student_dict["id"] = doc_ref.id
                doc_ref.set(student_dict)
                return StudentResponse(**student_dict)
            except Exception as e:
                failed.append({"row": idx + 1, "name": str(row.get("name", "unknown")), "error": str(e)})
                return None
        
        # Process all rows concurrently (much faster)
        results = await asyncio.gather(*[process_row(i, row) for i, row in df.iterrows()])
        created = [r for r in results if r is not None]
        
        if failed:
            print(f"[BulkUpload] {len(failed)} rows failed: {failed}")
        
        return CSVUploadResponse(success=True, count=len(created), students=created)
       
    
    def list_by_center(
        self,
        center_id: str,
        status: str | None = None
    ) -> list[StudentResponse]:
        """Get students for a center. Requires composite index."""
        query = self.collection.where("center_id", "==", center_id)
        
        if status:
            query = query.where("status", "==", status)
        
        # Composite index: center_id ASC + created_at DESC
        docs = query.order_by("created_at", direction=firestore.Query.DESCENDING).stream()
        
        students = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            students.append(StudentResponse(**data))
        
        return students
    
    def get(self, student_id: str) -> StudentResponse | None:
        doc = self.collection.document(student_id).get()
        if not doc.exists:
            return None
        data = doc.to_dict()
        data["id"] = doc.id
        return StudentResponse(**data)
    
    def update(self, student_id: str, data: StudentUpdate) -> bool:
        doc_ref = self.collection.document(student_id)
        if not doc_ref.get().exists:
            return False
        
        update_data = {k: v for k, v in data.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.now().isoformat()
        doc_ref.update(update_data)
        return True

    def delete(self, student_id: str) -> bool:
        doc_ref = self.collection.document(student_id)

        if not doc_ref.get().exists:
            return False

        doc_ref.delete()
        return True
    
    def update_status(self, student_id: str, status: str) -> bool:
        valid = {"pending", "message_sent", "replied", "paid"}
        if status not in valid:
            raise ValueError(f"Invalid status. Must be one of: {valid}")
        
        doc_ref = self.collection.document(student_id)
        if not doc_ref.get().exists:
            return False
        
        doc_ref.update({
            "status": status,
            "updated_at": datetime.now().isoformat()
        })
        return True
    
    def mark_messages_sent(self, center_id: str, student_ids: list[str]) -> int:
        """Bulk update status to message_sent."""
        sent = 0
        now = datetime.now().isoformat()
        
        for sid in student_ids:
            doc_ref = self.collection.document(sid)
            doc = doc_ref.get()
            if doc.exists and doc.to_dict().get("center_id") == center_id:
                doc_ref.update({
                    "status": "message_sent",
                    "message_sent_at": now,
                    "updated_at": now,
                })
                sent += 1
        
        return sent


def get_student_service() -> StudentService:
    return StudentService()