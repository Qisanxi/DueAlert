#!/usr/bin/env python3
import httpx
import os
import sys
import io
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("API_URL", "http://localhost:8000")
FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY", "")

# Unique email every run
TEST_EMAIL = f"apitest{datetime.now().strftime('%H%M%S%f')}@example.com"
TEST_PASSWORD = "TestPass123!"
TEST_PHONE = "+919876543210"

def get_firebase_token():
    if not FIREBASE_API_KEY:
        print("❌ Set FIREBASE_API_KEY env var")
        sys.exit(1)

    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FIREBASE_API_KEY}"
    
    r = httpx.post(url, json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD,
        "returnSecureToken": True
    })
    
    if r.status_code != 200:
        print(f"❌ Firebase Auth Failed: {r.status_code}")
        try:
            err = r.json()
            print(f"   Error: {err.get('error', {}).get('message', r.text)}")
        except:
            print(f"   Response: {r.text[:300]}")
        sys.exit(1)
    
    token = r.json()["idToken"]
    print(f"✅ Firebase token acquired for {TEST_EMAIL}")
    return token

token = get_firebase_token()
client = httpx.Client(
    base_url=BASE_URL,
    headers={"Authorization": f"Bearer {token}"},
    timeout=60
)

def test(name, method, path, **kwargs):
    print(f"\n{'='*50}")
    print(f"TEST: {name}")
    
    r = client.request(method, path, **kwargs)
    print(f"Status: {r.status_code}")
    
    try:
        body = r.json()
        print(f"Body: {json.dumps(body, indent=2)[:600]}")
    except:
        print(f"Body: {r.text[:300]}")
    
    if r.status_code >= 400:
        print("❌ FAILED")
        return None
    
    print("✅ PASSED")
    return body

# ─── RUN ALL TESTS ───────────────────────────────────────

test("Health", "GET", "/health")

test("Create Center", "POST", "/api/centers", json={
    "name": "Test Center", "owner_name": "Test", "owner_phone": TEST_PHONE
})

test("Get My Center", "GET", "/api/centers/me")

student_res = test("Create Student", "POST", "/api/students", json={
    "center_id": "x", "name": "Rahul", "phone": TEST_PHONE,
    "parent_name": "Rajesh", "course": "JEE", "monthly_fee": 15000,
    "due_amount": 15000, "due_date": "2026-08-25", "notes": "Test"
})

if student_res and "student" in student_res:
    sid = student_res["student"]["id"]
    print(f"\n📝 Student ID: {sid}")
    print(f"📝 Risk Score: {student_res['student'].get('risk_score')}")
    print(f"📝 Message: {student_res['student'].get('message_text', '')[:80]}...")
    
    test("Get Student by ID", "GET", f"/api/students/{sid}")
    test("Update Status", "POST", f"/api/students/{sid}/status?status=message_sent")
    test("Get WhatsApp Link", "GET", f"/api/messages/whatsapp-link/{sid}")

test("Get All Students", "GET", "/api/students")

# CSV Upload
csv_data = "name,phone,parent_name,course,monthly_fee,due_amount,due_date,notes\n"
csv_data += f"Priya,{TEST_PHONE},Anita,NEET,12000,12000,2026-08-26,CSV test\n"

test("CSV Upload", "POST", "/api/students/bulk-upload", files={
    "file": ("students.csv", io.BytesIO(csv_data.encode()), "text/csv")
})

test("Dashboard", "GET", "/api/dashboard/me")

print(f"\n{'='*50}")
print("✅ ALL TESTS COMPLETE")