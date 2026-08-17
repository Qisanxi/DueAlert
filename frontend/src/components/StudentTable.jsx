import { useState } from 'react'
import { MessageCircle, Phone, CheckCircle, Clock, ExternalLink, Trash2 } from 'lucide-react'
import RiskBadge from './RiskBadge'
import StatusTracker from './StatusTracker'
import MessagePreview from './MessagePreview'
import { useSendMessages, useUpdateStatus, useDeleteStudent } from '../hooks/useStudents'
import { api } from '../lib/api'

export default function StudentTable({ students }) {
  const [selected, setSelected] = useState(new Set())
  const [previewStudent, setPreviewStudent] = useState(null)
  const sendMessages = useSendMessages()
  const updateStatus = useUpdateStatus()
  const deleteStudent = useDeleteStudent()

  const toggleSelect = (id) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const toggleAll = () => {
    if (selected.size === students.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(students.map(s => s.id)))
    }
  }

  const handleDelete = async (studentId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this student? This action cannot be undone.'
    )

    if (!confirmed) return

    try {
      await deleteStudent.mutateAsync(studentId)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleBulkSend = async () => {
    const ids = Array.from(selected)
    await sendMessages.mutateAsync(ids)

    ids.forEach((id, idx) => {
      setTimeout(async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/messages/whatsapp-link/${id}`, {
          headers: { Authorization: `Bearer ${await window.__authToken || ''}` }
        })
        const data = await res.json()
        if (data.success) {
          window.open(data.wa_link, '_blank')
        }
      }, idx * 800)
    })

    setSelected(new Set())
  }

  const handleStatusChange = (studentId, status) => {
    updateStatus.mutate({ studentId, status })
  }

  const handleSingleSend = async (studentId) => {
    try {
      // First generate/send the reminder through the backend
      await sendMessages.mutateAsync([studentId])

      // Get the WhatsApp deep link
      const data = await api.getWhatsAppLink(studentId)

      if (!data.success || !data.wa_link) {
        throw new Error('Unable to generate WhatsApp link')
      }

      // Important for mobile browsers
      window.location.href = data.wa_link

    } catch (err) {
      console.error('WhatsApp error:', err)
      alert(err.message || 'Failed to open WhatsApp')
    }
  }

  if (!students?.length) {
    return (
      <div className="card text-center py-12 text-slate-500">
        No students found. Upload a CSV to get started.
      </div>
    )
  }

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Students ({students.length})</h3>
          {selected.size > 0 && (
            <button
              onClick={handleBulkSend}
              disabled={sendMessages.isPending}
              className="btn-primary flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Send to {selected.size} selected
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2">
                  <input
                    type="checkbox"
                    checked={selected.size === students.length && students.length > 0}
                    onChange={toggleAll}
                    className="rounded border-slate-300"
                  />
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">Student</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">Parent & Contact</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">Due</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">Risk</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">Status</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2">
                    <input
                      type="checkbox"
                      checked={selected.has(student.id)}
                      onChange={() => toggleSelect(student.id)}
                      className="rounded border-slate-300"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <div className="font-medium text-slate-900">{student.name}</div>
                    <div className="text-xs text-slate-500">{student.course}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm text-slate-900">{student.parent_name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {student.phone}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="font-semibold text-slate-900">₹{student.due_amount}</div>
                    <div className="text-xs text-slate-500">Due: {student.due_date}</div>
                    {student.predicted_payment_date && (
                      <div className="text-xs text-primary-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Predicted: {student.predicted_payment_date}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <RiskBadge score={student.risk_score || 0} />
                  </td>
                  <td className="py-3 px-2">
                    <StatusTracker currentStatus={student.status || 'pending'} />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewStudent(student)}
                        className="p-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg transition-colors"
                        title="View AI Message"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      {student.status !== 'paid' && (
                        <button
                          onClick={() => handleStatusChange(student.id, 'paid')}
                          className="p-2 bg-success-50 hover:bg-success-100 text-success-600 rounded-lg transition-colors"
                          title="Mark as Paid"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(student.id)}
                        disabled={deleteStudent.isPending}
                        className="p-2 bg-danger-50 hover:bg-danger-100 text-danger-600 rounded-lg transition-colors"
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleSingleSend(student.id)}
                        className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                        title="Send WhatsApp"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {previewStudent && (
        <MessagePreview
          student={previewStudent}
          onClose={() => setPreviewStudent(null)}
          onSend={(s) => handleSingleSend(s.id)}
        />
      )}
    </>
  )
}