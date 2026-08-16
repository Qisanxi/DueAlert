export default function RiskBadge({ score }) {
  let color = 'bg-success-500'
  let label = 'Low Risk'

  if (score >= 70) {
    color = 'bg-danger-500'
    label = 'High Risk'
  } else if (score >= 40) {
    color = 'bg-warning-500'
    label = 'Medium Risk'
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="text-xs text-slate-500">({score})</span>
    </div>
  )
}