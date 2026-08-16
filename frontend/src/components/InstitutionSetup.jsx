import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { centerSchema } from '../schemas/center'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { Building2, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function CenterSetup({ onSetup }) {
  const { user } = useAuth()
  const [apiError, setApiError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(centerSchema)
  })

  const onSubmit = async (data) => {
    setApiError('')
    try {
      const res = await api.createCenter(data)
      if (res.success) {
        onSetup(res.center.id, res.center.name)
      }
    } catch (err) {
      setApiError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="card w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Set Up Center</h1>
          <p className="text-gray-500 mt-1">Configure your coaching institute</p>
        </div>

        {apiError && (
          <div className="mb-4 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-center gap-2 text-sm text-danger-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Center Name</label>
            <input {...register('name')} className="input" placeholder="e.g., Sharma Coaching Center" />
            {errors.name && <p className="text-xs text-danger-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
            <input {...register('owner_name')} className="input" placeholder="e.g., Rajesh Sharma" />
            {errors.owner_name && <p className="text-xs text-danger-600 mt-1">{errors.owner_name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Phone</label>
            <input {...register('owner_phone')} className="input" placeholder="+91 98765 43210" />
            {errors.owner_phone && <p className="text-xs text-danger-600 mt-1">{errors.owner_phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address (Optional)</label>
            <input {...register('address')} className="input" placeholder="Delhi, India" />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Creating...' : 'Create Center'}
          </button>
        </form>
      </div>
    </div>
  )
}