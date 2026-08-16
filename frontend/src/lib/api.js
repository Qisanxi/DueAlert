import { auth } from './firebase'

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '')

async function getAuthHeader() {
  const user = auth.currentUser
  if (!user) return {}
  const token = await user.getIdToken(true)
  return { Authorization: `Bearer ${token}` }
}

async function fetchApi(endpoint, options = {}) {
  const authHeader = await getAuthHeader()

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...options.headers,
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `HTTP ${res.status}`)
  }

  return res.json()
}

export const api = {
  createInstitution: (data) => fetchApi('/api/centers', { method: 'POST', body: JSON.stringify(data) }),
  getMyInstitution: () => fetchApi('/api/centers/me'),

  getStudents: (status) => {
    let url = '/api/students'
    if (status) url += `?status=${status}`
    return fetchApi(url)
  },

  createStudent: (data) => fetchApi('/api/students', { method: 'POST', body: JSON.stringify(data) }),

  uploadCSV: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const headers = await getAuthHeader()

    const res = await fetch(`${API_BASE}/api/students/bulk-upload`, {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail || `HTTP ${res.status}`)
    }
    return res.json()
  },

  updateStatus: (studentId, status) =>
    fetchApi(`/api/students/${studentId}/status?status=${status}`, { method: 'POST' }),

  sendMessages: (studentIds) => fetchApi('/api/messages/send', {
    method: 'POST',
    body: JSON.stringify({ student_ids: studentIds })
  }),

  getDashboard: () => fetchApi('/api/dashboard/me'),
}