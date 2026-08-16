import { X, MessageSquare, Send, User } from 'lucide-react'
import RiskBadge from './RiskBadge'

export default function MessagePreview({ student, onClose, onSend }) {
  if (!student) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-600" />
            AI Generated Message
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div className="font-medium text-slate-900">{student.name}</div>
            <div className="text-xs text-slate-500">{student.parent_name} • {student.phone}</div>
          </div>
          <div className="ml-auto">
            <RiskBadge score={student.risk_score || 0} />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="text-xs font-medium text-green-700 mb-2 uppercase tracking-wide">WhatsApp Message</div>
          <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-medium">
            {student.message_text || 'No message generated yet.'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 mb-6">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-slate-400 mb-1">Due Amount</div>
            <div className="font-semibold text-slate-900">₹{student.due_amount}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-slate-400 mb-1">Predicted Payment</div>
            <div className="font-semibold text-slate-900">{student.predicted_payment_date || '—'}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Close
          </button>
          <button
            onClick={() => { onSend(student); onClose() }}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}