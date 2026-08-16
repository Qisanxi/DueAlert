import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { Building2, AlertCircle, User, Phone, MapPin, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const institutionSchema = z.object({
  name: z.string().min(2, 'Institution name must be at least 2 characters').max(200),
  owner_name: z.string().min(2, 'Owner name is required').max(200),
  owner_phone: z.string().min(10, 'Valid phone required').max(20),
  address: z.string().max(500).optional().or(z.literal('')),
})

export default function InstitutionSetup({ onSetup }) {
  const { user } = useAuth()
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(institutionSchema)
  })

  const onSubmit = async (data) => {
    setApiError('')
    setIsSubmitting(true)
    
    try {
      const res = await api.createInstitution(data)
      if (res.success) {
        onSetup(res.center.id, res.center.name)
      }
    } catch (err) {
      setApiError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-[100px]" />
      
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/20">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Set Up Your Institution</h1>
            <p className="text-slate-500 mt-2">Configure your coaching institute to start collecting fees</p>
          </div>

          {apiError && (
            <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-xl flex items-start gap-3 text-sm text-danger-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Institution Name</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input {...register('name')} className="input pl-12" placeholder="e.g., Lala Coaching Center" />
              </div>
              {errors.name && <p className="text-xs text-danger-600 mt-1.5">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Owner Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input {...register('owner_name')} className="input pl-12" placeholder="e.g., Rajesh Sharma" />
              </div>
              {errors.owner_name && <p className="text-xs text-danger-600 mt-1.5">{errors.owner_name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Owner Phone</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input {...register('owner_phone')} className="input pl-12" placeholder="+91 98765 43210" />
              </div>
              {errors.owner_phone && <p className="text-xs text-danger-600 mt-1.5">{errors.owner_phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Address <span className="text-slate-400 font-normal">(Optional)</span></label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input {...register('address')} className="input pl-12" placeholder="Delhi, India" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Institution
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}