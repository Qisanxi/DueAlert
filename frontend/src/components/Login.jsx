import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../context/AuthContext'
import { AlertCircle, GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function Login() {
  const { signup, login } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')
    
    try {
      if (isRegister) {
        await signup(data.email, data.password)
        setSuccess('Account created! Please check your email to verify.')
      } else {
        await login(data.email, data.password)
      }
    } catch (err) {
      const msg = err.message.replace('Firebase: ', '').replace('Error ', '')
      if (msg.includes('email-already-in-use')) setError('This email is already registered.')
      else if (msg.includes('invalid-credential')) setError('Invalid email or password.')
      else setError(msg)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">DueAlert</h1>
            <p className="text-slate-300 text-sm">
              {isRegister ? 'Create your institution account' : 'Sign in to your institution'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-danger-500/10 border border-danger-500/20 rounded-xl flex items-start gap-3 text-sm text-danger-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-success-500/10 border border-success-500/20 rounded-xl flex items-start gap-3 text-sm text-success-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  {...register('email')} 
                  type="email" 
                  className="input pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:bg-slate-800"
                  placeholder="owner@institution.com" 
                />
              </div>
              {errors.email && <p className="text-xs text-danger-400 mt-1.5">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  {...register('password')} 
                  type="password" 
                  className="input pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:bg-slate-800"
                  placeholder="••••••••" 
                />
              </div>
              {errors.password && <p className="text-xs text-danger-400 mt-1.5">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isRegister ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess(''); }}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {isRegister ? 'Already have an account? ' : "Don't have an account? "}
              <span className="text-primary-400 font-medium hover:text-primary-300">{isRegister ? 'Sign in' : 'Register'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}