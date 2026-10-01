# DueAlert

![CI](https://github.com/Qisanxi/DueAlert/actions/workflows/ci.yml/badge.svg)
![Tests](https://github.com/Qisanxi/DueAlert/actions/workflows/test.yml/badge.svg)
![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)

### AI-Powered Fee Collection Assistant for Coaching & Educational Centers

DueAlert is an AI-powered fee collection and student payment tracking platform designed for coaching centers and educational institutions.

Instead of relying on spreadsheets, manual follow-ups, and repetitive payment reminders, DueAlert helps institutions organize student fee data, identify payment-risk patterns, generate personalized reminders with **Google Gemini**, and monitor collection activity from a centralized dashboard.

> **Built for the Build with Gemini XPRIZE Hackathon 2026**

---

## 🌐 Live Demo

### Live Website 

Deployed on Firebase Hosting: [https://duealert-bbb61.web.app]

### Backend API Docs : [ https://duealert.onrender.com/docs]

The production deployment is intended to provide a working environment for demonstrating the DueAlert workflow.

## 🎥 Product Demo

See DueAlert in action: [https://youtube.com/shorts/8afWOpmzvsc?feature=share]

**[▶️ Watch the DueAlert DEMO : ]** 

The demo walks through the complete workflow, including:

- How it works 
- How AI is integrated in workflow

---

---

## 🚀 Overview

Managing outstanding student fees is a repetitive and time-consuming process for many coaching centers.

Administrators often need to:

* Track students and their outstanding fees
* Monitor due dates
* Identify students who may delay payment
* Contact parents individually
* Write payment reminders repeatedly
* Keep track of payment follow-ups
* Maintain spreadsheets or manually updated records

DueAlert brings these workflows into one platform and uses AI to assist with the most repetitive part of the process: **understanding payment risk and creating personalized parent communication.**

The result is a workflow that helps institutions move from:

**Manual tracking → AI-assisted analysis → Personalized communication → Collection tracking**

---

## ✨ Key Features

### 🤖 AI Payment-Risk Analysis

DueAlert uses **Google Gemini** to analyze student fee information and generate:

* A payment risk score from 0–100
* A predicted payment date
* A personalized WhatsApp reminder
* Empathetic Hinglish communication for parents

The AI is specifically instructed to produce messages that are respectful, warm, non-threatening, and personalized to the parent and student's situation.

---

### 📊 Collection Dashboard

The dashboard provides an overview of the institution's fee collection activity, including:

* Total students
* Pending payments
* Messages sent
* Parent responses
* Paid students
* Total amount due
* Total amount collected
* Collection rate
* High-risk students

This gives administrators a centralized view of their collection workflow instead of relying on scattered spreadsheets or manual records.

---

### 👨‍🎓 Student Management

Administrators can manage student payment information including:

* Student name
* Parent name
* Phone number
* Course
* Monthly fee
* Outstanding amount
* Due date
* Notes
* Payment status
* AI risk score
* Predicted payment date
* Generated reminder message

Supported payment states include:

`pending` → `message_sent` → `replied` → `paid`

---

### 📥 Bulk CSV Upload

Institutions can import student records through CSV instead of entering students individually.

The bulk-upload workflow allows administrators to:

1. Prepare student information in CSV format
2. Upload the file
3. Import multiple students
4. Process their fee information
5. Use AI-assisted analysis for collection follow-up

A sample CSV is included in the repository for testing and demonstration.

---

### 💬 WhatsApp-Ready Communication

DueAlert generates personalized reminders designed for WhatsApp communication.

Messages are generated using the student's payment information and parent's name, while maintaining a natural Hinglish tone.

The goal is not simply to send automated reminders, but to make communication feel **personal, respectful, and useful**.

---

### 🔐 Authentication & Institution Isolation

The application uses Firebase Authentication for account management.

The frontend supports:

* Email/password registration
* Email/password login
* Email verification
* Logout
* Authenticated application access

Each institution operates within its own authenticated context so that student and collection data can be associated with the correct center.

---

## 🧠 How AI Transforms the Workflow

Traditional fee collection generally looks like:

```text
Student Records
      ↓
Administrator checks spreadsheet
      ↓
Administrator identifies overdue students
      ↓
Administrator decides who needs follow-up
      ↓
Administrator writes reminder manually
      ↓
Administrator sends message
      ↓
Administrator updates records manually
```

DueAlert introduces AI into this workflow:

```text
Student Records
      ↓
DueAlert analyzes payment information
      ↓
Google Gemini evaluates payment risk
      ↓
Predicted payment date
      +
Risk score
      +
Personalized Hinglish message
      ↓
Administrator reviews collection activity
      ↓
WhatsApp-ready communication
      ↓
Payment status tracking
```

This makes AI part of the operational workflow rather than simply adding a chatbot to the application.

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      DueAlert UI     │
                         │   React + Vite       │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │    FastAPI Backend   │
                         │                      │
                         │  Authentication      │
                         │  Student Management  │
                         │  Dashboard APIs      │
                         │  CSV Processing      │
                         └───────┬───────┬──────┘
                                 │       │
                    ┌────────────┘       └──────────────┐
                    ▼                                   ▼
          ┌──────────────────┐                 ┌──────────────────┐
          │ Firebase         │                 │ Google Gemini    │
          │ Authentication   │                 │ AI Analysis      │
          │ Firestore        │                 │ Risk + Messages  │
          └──────────────────┘                 └──────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* React Router
* TanStack React Query
* React Hook Form
* Zod
* Recharts
* Lucide React
* Firebase Authentication
* Tailwind CSS

The frontend dependencies and development scripts are defined in `frontend/package.json`.

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* Firebase Admin SDK
* Google Cloud Firestore
* Google Gemini API
* Pandas
* Python-dotenv

The backend dependency configuration includes FastAPI, Firebase Admin, Firestore, and the Google GenAI SDK.

### Cloud & Infrastructure

* Firebase Authentication
* Google Cloud Firestore
* Firebase Hosting
* Render

---

## ☁️ Google Cloud & Gemini Integration

DueAlert uses Google Cloud services as part of its core application architecture.

### Firebase / Google Cloud

Firebase is used for:

* Authentication
* Email verification
* Firestore-backed application data
* Firestore security rules (defense-in-depth — see [`Security Considerations`](#-security-considerations))
* Hosting (frontend)

The backend initializes the Firebase Admin SDK and obtains a Firestore client for application data access. The frontend ships `firestore.rules` and `firestore.indexes.json` alongside `firebase.json` so that `firebase deploy --only firestore` applies the same access policy and composite indexes to the production project.

### Google Gemini

Gemini powers the AI fee-collection analysis.

The backend uses the Google GenAI SDK and the configured Gemini model to analyze individual student payment information.

The AI workflow produces:

```text
Student Information
       ↓
Gemini Analysis
       ↓
Risk Score
       +
Predicted Payment Date
       +
Personalized Hinglish Message
```

The current implementation uses a configurable Gemini model, with `gemini-2.5-flash` as the configured default.

---

## 📁 Project Structure

```text
DueAlert/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── ping-render.yml
│       └── test.yml
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── centers.py
│   │   │   ├── dashboard.py
│   │   │   ├── messages.py
│   │   │   └── student.py
│   │   │
│   │   ├── services/
│   │   │   ├── center_service.py
│   │   │   ├── dashboard_service.py
│   │   │   ├── gemini_service.py
│   │   │   └── student_service.py
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.py
│   │   │
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   ├── main.py
│   │   └── models.py
│   │
│   ├── tests/
│   │   ├── test_api.py              # Integration tests (live backend + Firebase)
│   │   └── test_gemini_extract.py  # Unit tests for _extract_json
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── App.jsx
│   │
│   ├── firebase.json          # Hosting + Firestore config
│   ├── firestore.rules        # Firestore security rules
│   ├── firestore.indexes.json # Composite indexes (auto-managed)
│   ├── package.json
│   └── vite configuration
│
├── sample_student.csv
├── LICENSE
└── README.md
```

---

## ⚙️ Local Development

### Prerequisites

Make sure you have installed:

* Python 3.10+
* Node.js 18+
* npm
* A Firebase project
* A Gemini API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/Qisanxi/DueAlert.git
cd DueAlert
```

---

## 2. Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Activate it on macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

### 3. Configure Backend Environment Variables

Create a `.env` file inside the `backend` directory:

```env
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_KEY_PATH=serviceAccountKey.json

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

CORS_ORIGINS=["http://localhost:5173"]
```

For local development, configure your Firebase service-account credentials according to the application's Firebase setup.

**Never commit service-account credentials, API keys, or `.env` files to Git.**

---

### 4. Start the Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

The API will be available locally through the Uvicorn development server.

FastAPI automatically provides interactive API documentation through:

```text
/docs
```

---

## 5. Frontend Setup

Open another terminal and move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL in the terminal.

---

## 🔑 Environment Variables

### Backend

| Variable              | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `FIREBASE_PROJECT_ID` | Firebase/Google Cloud project ID                                   |
| `FIREBASE_KEY_PATH`   | Path to Firebase service-account credentials for local development |
| `GEMINI_API_KEY`      | Google Gemini API key                                              |
| `GEMINI_MODEL`        | Gemini model used for AI analysis                                  |
| `CORS_ORIGINS`        | Allowed frontend origins                                           |

### Production Firebase Credentials

The deployed backend supports Firebase credentials through a Base64-encoded environment variable:

```text
FIREBASE_KEY_BASE64
```

This allows production credentials to be supplied securely through the hosting environment rather than committing credential files to the repository.

---

## 🧪 Testing

Backend tests live under `backend/tests/`:

* `test_api.py` — Integration tests that exercise the live API and Firebase
  Auth. Requires a running backend and `FIREBASE_API_KEY` set in the
  environment.
* `test_gemini_extract.py` — Pure unit tests for
  `gemini_service._extract_json`. No network, no API keys required (dummy
  credentials are injected automatically by the CI workflow).

### Run unit tests locally

```bash
cd backend
pip install -r requirements.txt
pip install pytest

# Dummy env vars satisfy app.config.Settings() during import —
# _extract_json never makes network calls.
export FIREBASE_PROJECT_ID=dummy
export GEMINI_API_KEY=dummy

# Skip the integration test file in local/unit runs:
python -m pytest tests/ -v --ignore=tests/test_api.py
```

### CI

GitHub Actions runs two workflows on every push and pull request:

| Workflow        | File                          | What it does                                                    |
| --------------- | ----------------------------- | --------------------------------------------------------------- |
| **CI**          | `.github/workflows/ci.yml`    | Frontend `npm ci` + `npm run lint` + `npm run build`; backend byte-compile check |
| **Tests**       | `.github/workflows/test.yml`  | Installs backend deps + pytest, runs unit tests for `_extract_json` |

The status badges at the top of this README reflect the latest run of each workflow.

---

## 🚀 Deployment

DueAlert is deployed as a separate frontend and backend application.

### Frontend

The React/Vite frontend is deployed using **Firebase Hosting**.

### Backend

The FastAPI backend is deployed on **Render**.

### Production Services

* **Frontend:** Firebase Hosting
* **Backend API:** Render
* **Authentication:** Firebase Authentication
* **Database:** Cloud Firestore
* **AI:** Google Gemini API


## 📋 Example Student CSV

A sample CSV file is included in the root of the repository:

```text
sample_student.csv
```

The application supports bulk student import through the frontend's CSV upload workflow.

The backend validates that uploaded student files use the CSV format before processing them.

---

## 🔄 Core Workflow

```text
1. Institution creates an account
                ↓
2. Email verification
                ↓
3. Institution setup
                ↓
4. Add students manually
       OR upload CSV
                ↓
5. Student fee information stored
                ↓
6. AI analyzes payment risk
                ↓
7. Risk score generated
                ↓
8. Payment date predicted
                ↓
9. Personalized Hinglish reminder generated
                ↓
10. Collection status tracked
                ↓
11. Dashboard reflects collection progress
```

---

## 🎯 Hackathon Alignment

DueAlert is designed around the **Money & Financial Access** category of the Build with Gemini XPRIZE Hackathon.

The project addresses a practical financial workflow for educational institutions by helping them manage outstanding student fees and improve payment follow-up.

### AI-Native Operations

AI is integrated directly into the application's operational workflow.

Gemini is used to:

* Analyze student payment information
* Generate a payment risk score
* Predict a likely payment date
* Generate personalized parent communication

This means AI is not an isolated feature—it directly supports the core business workflow.

### Google Cloud Usage

The project uses Google Cloud ecosystem services through:

* Firebase Authentication
* Cloud Firestore
* Firebase Hosting
* Google Gemini API

### Business Problem

Educational and coaching institutions can spend significant time manually monitoring unpaid fees and contacting parents.

DueAlert aims to reduce this operational burden by turning payment data into actionable collection intelligence and communication.

The hackathon rules require projects to demonstrate how AI transforms workflows and require at least one Google Cloud product; LLM-based projects must also make at least one Gemini API call in the deployed application.

---

## 🔒 Security Considerations

DueAlert uses environment variables and deployment secrets for sensitive configuration.

Do not commit:

```text
.env
serviceAccountKey.json
Firebase service-account credentials
Gemini API keys
Firebase private keys
Production secrets
```

Production credentials should be configured through the hosting provider's environment/secrets management system.

### Firestore Security Rules

Repository path: `frontend/firestore.rules`

Firestore is **not** accessed directly from the React client today — the FastAPI backend talks to Firestore via the Firebase Admin SDK, which bypasses security rules by design. Even so, the rules file is included as a **defense-in-depth** layer: it documents the intended access policy in code, keeps the project out of Firestore "test mode" (which locks the database 30 days after creation), and prevents data leaks if Firestore is ever accessed directly from a browser (a future feature, a misconfigured component, or a malicious script).

Policy summary:

| Collection            | Operation             | Allowed when                                                                 |
| --------------------- | --------------------- | ---------------------------------------------------------------------------- |
| `centers/{centerId}` | read / update / delete | `request.auth.uid == resource.data.owner_uid`                                |
| `centers/{centerId}` | create                | `request.resource.data.owner_uid == request.auth.uid` (you can't claim another owner) |
| `students/{studentId}` | read / update / delete | The student's `center_id` points to a center where `owner_uid == request.auth.uid` |
| `students/{studentId}` | create                | Same as above, validated against `request.resource.data.center_id`           |
| Everything else       | —                     | **Denied by default** (`allow read, write: if false;`)                       |

### Firestore Composite Indexes

Repository path: `frontend/firestore.indexes.json`

Three composite indexes are required by the backend queries (auto-managed via `firebase deploy --only firestore:indexes`):

| # | Collection | Fields                                   | Used by                                                        |
| - | ---------- | ---------------------------------------- | -------------------------------------------------------------- |
| 1 | `students` | `center_id ASC, created_at DESC`         | `student_service.list_by_center` — student list (most recent first) |
| 2 | `students` | `center_id ASC, status ASC, created_at DESC` | `student_service.list_by_center(status)` — filtered student list |
| 3 | `students` | `center_id ASC, risk_score ASC`          | `dashboard_service.get_stats` — high-risk student count       |

### Deploy Firestore config from `frontend/`

```bash
cd frontend
# Install the Firebase CLI once: npm install -g firebase-tools
firebase login

# Preview the rules + indexes that will be deployed:
firebase deploy --only firestore --dry-run

# Deploy rules + indexes:
firebase deploy --only firestore
```

The `firestore` block in `frontend/firebase.json` is what wires `firebase deploy --only firestore` to the `firestore.rules` and `firestore.indexes.json` files:

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

---

## 🛣️ Future Improvements

Potential future improvements include:

* Automated WhatsApp Business API integration
* Automated reminder scheduling
* Payment gateway integration
* Advanced payment prediction models
* Historical payment behavior analysis
* Institution-level analytics
* Parent response sentiment analysis
* Automated follow-up sequences
* Multi-language message generation
* Collection performance reports
* Role-based access for institution staff

---

## 📜 License

This project is distributed under the license included in the repository.

See [`LICENSE`](LICENSE) for the complete license text.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

For significant changes, please open an issue first to discuss the proposed change before submitting a pull request.

---

## 👥 Team

**Sandeep Kumar**

Built as an AI-powered fee collection solution for the **Build with Gemini XPRIZE Hackathon 2026**.

---

## ⭐ Why DueAlert?

DueAlert focuses on a simple but important operational problem:

> **Helping educational institutions spend less time chasing payments and more time running their institutions.**

By combining structured student data, cloud infrastructure, and Gemini-powered analysis, DueAlert turns a manual fee-follow-up process into an AI-assisted collection workflow.
