import { useState, useEffect } from 'react'
import { LogOut, LayoutDashboard, Users, Upload, Building2, Bell, Menu, X } from 'lucide-react'
import { useAuth } from './context/AuthContext'
import { api } from './lib/api'
import Dashboard from './components/Dashboard'
import StudentTable from './components/StudentTable'
import CSVUpload from './components/CSVUpload'
import Login from './components/Login'
import InstitutionSetup from './components/InstitutionSetup'
import VerifyEmailScreen from './components/VerifyEmailScreen'
import { useStudents } from './hooks/useStudents'
import AddStudentModal from './components/AddStudentModal'

function App() {
  const { user, logout, emailVerified } = useAuth()
  const [institution, setInstitution] = useState(null)
  const [loadingInstitution, setLoadingInstitution] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: studentsData } = useStudents()
  const students = studentsData?.students || []
  const [showAddStudent, setShowAddStudent] = useState(false)

  useEffect(() => {
    if (!user) {
      setInstitution(null)
      setLoadingInstitution(false)
      return
    }

    setLoadingInstitution(true)
    setInstitution(null)

    api.getMyInstitution()
      .then(res => {
        if (res.success) setInstitution(res.center)
      })
      .catch((err) => {
        console.error('[App] Institution fetch failed:', err.message)
        setInstitution(null)
      })
      .finally(() => setLoadingInstitution(false))
  }, [user])

  if (!user) return <Login />
  if (!emailVerified) return <VerifyEmailScreen />
  if (loadingInstitution) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  )
  if (!institution) return <InstitutionSetup onSetup={(id, name) => setInstitution({ id, name })} />

  return (
    <div key={user?.uid} className="min-h-screen bg-slate-50 flex">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200
        flex flex-col
        transform transition-transform duration-300
        lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">DueAlert</h1>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">AI Fee Collection</p>
            </div>
          </div>
        </div>

        <div className="p-4 flex-1">
          <div className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl border border-primary-100">
            <div className="text-[11px] font-semibold text-primary-600 uppercase tracking-wider mb-1">Current Institution</div>
            <div className="text-sm font-bold text-primary-900 truncate">{institution.name}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
              <span className="text-[11px] text-primary-600 font-medium">Active</span>
            </div>
          </div>

          <nav className="space-y-1">
            <NavButton active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'), setMobileMenuOpen(false) }} icon={LayoutDashboard} label="Dashboard" />
            <NavButton active={activeTab === 'students'} onClick={() => { setActiveTab('students'), setMobileMenuOpen(false) }} icon={Users} label="All Students" />
            <NavButton active={activeTab === 'upload'} onClick={() => { setActiveTab('upload'), setMobileMenuOpen(false) }} icon={Upload} label="Bulk Upload" />
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-700 truncate">{user.email}</div>
              <div className="text-[10px] text-slate-400">{emailVerified ? 'Verified' : 'Unverified'}</div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-danger-50 hover:bg-danger-100 text-danger-700 rounded-xl text-sm font-medium transition-colors border border-danger-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8">
        <div className="lg:hidden flex items-center justify-between mb-6">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-bold text-lg text-slate-900">
            DueAlert
          </div>
          <div className="w-9" />
        </div>
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
                  <p className="text-sm text-slate-500 mt-1">Overview of your fee collection</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                  <Bell className="w-4 h-4" />
                  <span>{students.length} students tracked</span>
                </div>
              </div>
              <Dashboard />
            </>
          )}

          {activeTab === 'students' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Students
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage and track all student fees
                  </p>
                </div>

                <button
                  onClick={() => setShowAddStudent(true)}
                  className="btn-primary"
                >
                  + Add Student
                </button>
              </div>
            </>
          )}

          {activeTab === 'upload' && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Upload Students</h2>
                <p className="text-sm text-slate-500 mt-1">Bulk import via CSV with AI analysis</p>
              </div>
              <CSVUpload onUploadSuccess={() => setActiveTab('dashboard')} />
            </>
          )}
        </div>
      </main>
      {showAddStudent && (
        <AddStudentModal
          onClose={() => setShowAddStudent(false)}
        />
      )}
    </div>
  )
}

function NavButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={active ? 'sidebar-link-active' : 'sidebar-link-inactive'}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  )
}

export default App