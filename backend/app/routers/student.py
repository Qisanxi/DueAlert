from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from app.models import StudentCreate, StudentResponse, StudentUpdate, CSVUploadResponse
from app.services.student_service import get_student_service
from app.dependencies import get_current_center

router = APIRouter(prefix="/api/students", tags=["Students"])


@router.post("", response_model=dict)
async def create_student(student: StudentCreate, center_id: str = Depends(get_current_center)):
    svc = get_student_service()
    student.center_id = center_id
    created = await svc.create(student)
    return {"success": True, "student": created}


@router.post("/bulk-upload", response_model=CSVUploadResponse)
async def bulk_upload(file: UploadFile = File(...), center_id: str = Depends(get_current_center)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files allowed")
    
    svc = get_student_service()
    try:
        result = await svc.bulk_upload(center_id, file)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("", response_model=dict)
def get_students(status: str | None = None, center_id: str = Depends(get_current_center)):
    svc = get_student_service()
    students = svc.list_by_center(center_id, status)
    return {"success": True, "students": students}


@router.get("/{student_id}", response_model=dict)
def get_student(student_id: str, center_id: str = Depends(get_current_center)):
    svc = get_student_service()
    student = svc.get(student_id)
    if not student or student.center_id != center_id:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"success": True, "student": student}


@router.patch("/{student_id}", response_model=dict)
def update_student(student_id: str, update: StudentUpdate, center_id: str = Depends(get_current_center)):
    svc = get_student_service()
    student = svc.get(student_id)
    if not student or student.center_id != center_id:
        raise HTTPException(status_code=404, detail="Student not found")
    
    ok = svc.update(student_id, update)
    return {"success": True, "student_id": student_id}


@router.post("/{student_id}/status", response_model=dict)
def update_status(student_id: str, status: str, center_id: str = Depends(get_current_center)):
    svc = get_student_service()
    student = svc.get(student_id)
    if not student or student.center_id != center_id:
        raise HTTPException(status_code=404, detail="Student not found")
    
    try:
        ok = svc.update_status(student_id, status)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"success": True, "student_id": student_id, "status": status}

@router.delete("/{student_id}", response_model=dict)
def delete_student(
    student_id: str,
    center_id: str = Depends(get_current_center)
):
    svc = get_student_service()

    student = svc.get(student_id)

    if not student or student.center_id != center_id:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    deleted = svc.delete(student_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "success": True,
        "student_id": student_id
    }