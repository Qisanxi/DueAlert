from app.database import get_db
from app.models import DashboardStats, DashboardResponse


class DashboardService:
    def __init__(self):
        self.db = get_db()
        self.collection = self.db.collection("students")
    
    def get_stats(self, center_id: str) -> DashboardResponse:
        docs = self.collection.where("center_id", "==", center_id).stream()
        
        total = 0
        pending = 0
        message_sent = 0
        replied = 0
        paid = 0
        total_due = 0.0
        total_collected = 0.0
        
        for doc in docs:
            data = doc.to_dict()
            total += 1
            status = data.get("status", "pending")
            due = data.get("due_amount", 0) or 0
            
            if status == "pending":
                pending += 1
                total_due += due
            elif status == "message_sent":
                message_sent += 1
                total_due += due
            elif status == "replied":
                replied += 1
                total_due += due
            elif status == "paid":
                paid += 1
                total_collected += due
        
        # High risk count (risk_score >= 70)
        high_risk_query = (
            self.collection
            .where("center_id", "==", center_id)
            .where("risk_score", ">=", 70)
        )
        high_risk_count = sum(1 for _ in high_risk_query.stream())
        
        stats = DashboardStats(
            total_students=total,
            pending=pending,
            message_sent=message_sent,
            replied=replied,
            paid=paid,
            total_due=round(total_due, 2),
            total_collected=round(total_collected, 2),
            collection_rate=round((paid / total * 100), 1) if total > 0 else 0.0,
            high_risk_count=high_risk_count,
        )
        
        return DashboardResponse(success=True, stats=stats)


def get_dashboard_service() -> DashboardService:
    return DashboardService()