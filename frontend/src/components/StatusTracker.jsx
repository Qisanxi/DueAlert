const statuses = [
  { key: 'pending', label: 'Pending', color: 'bg-slate-400' },
  { key: 'message_sent', label: 'Message Sent', color: 'bg-primary-500' },
  { key: 'replied', label: 'Replied', color: 'bg-warning-500' },
  { key: 'paid', label: 'Paid', color: 'bg-success-500' },
]

export default function StatusTracker({ currentStatus }) {
  const currentIndex = statuses.findIndex(s => s.key === currentStatus)

  return (
    <div className="flex items-center gap-1">
      {statuses.map((status, idx) => (
        <div key={status.key} className="flex items-center">
          <div className={`
            px-2 py-1 rounded text-xs font-medium text-white
            ${idx <= currentIndex ? status.color : 'bg-slate-200 text-slate-500'}
            transition-all duration-300
          `}>
            {status.label}
          </div>
          {idx < statuses.length - 1 && (
            <div className={`w-4 h-0.5 ${idx < currentIndex ? 'bg-success-500' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}