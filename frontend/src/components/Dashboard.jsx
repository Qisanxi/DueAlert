import { useDashboard } from '../hooks/useStudents'
import { Users, IndianRupee, TrendingUp, AlertTriangle, MessageSquare, CheckCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#22c55e']

export default function Dashboard() {
  const { data, isLoading } = useDashboard()
  
  if (isLoading) {
    return (
      <div className="card h-96 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }
  
  const stats = data?.stats || {}
  
  const statusData = [
    { name: 'Pending', value: stats.pending || 0 },
    { name: 'Message Sent', value: stats.message_sent || 0 },
    { name: 'Replied', value: stats.replied || 0 },
    { name: 'Paid', value: stats.paid || 0 },
  ]
  
  const revenueData = [
    { name: 'Due', amount: stats.total_due || 0 },
    { name: 'Collected', amount: stats.total_collected || 0 },
  ]
  
  const statCards = [
    { label: 'Total Students', value: stats.total_students || 0, icon: Users, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Total Due', value: `₹${(stats.total_due || 0).toLocaleString()}`, icon: IndianRupee, color: 'text-danger-600', bg: 'bg-danger-50' },
    { label: 'Collected', value: `₹${(stats.total_collected || 0).toLocaleString()}`, icon: CheckCircle, color: 'text-success-600', bg: 'bg-success-50' },
    { label: 'Collection Rate', value: `${stats.collection_rate || 0}%`, icon: TrendingUp, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'High Risk', value: stats.high_risk_count || 0, icon: AlertTriangle, color: 'text-danger-600', bg: 'bg-danger-50' },
    { label: 'Messages Sent', value: stats.message_sent || 0, icon: MessageSquare, color: 'text-warning-600', bg: 'bg-warning-50' },
  ]
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="card p-4">
            <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{card.value}</div>
            <div className="text-xs text-slate-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Payment Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-xs text-slate-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}