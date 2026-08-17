import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { useCreateStudent } from '../hooks/useStudents'

const studentSchema = z.object({
  name: z.string().min(1, 'Student name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  parent_name: z.string().min(1, 'Parent name is required'),
  course: z.string().min(1, 'Course is required'),
  monthly_fee: z.coerce.number().min(0, 'Must be 0 or greater'),
  due_amount: z.coerce.number().min(0, 'Must be 0 or greater'),
  due_date: z.string().min(1, 'Due date is required'),
  notes: z.string().optional(),
})

export default function AddStudentModal({ onClose }) {
  const createStudent = useCreateStudent()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      notes: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      await createStudent.mutateAsync(data)
      onClose()
    } catch (err) {
      alert(err.message)
    }
  }

  const fields = [
    ['name', 'Student Name', 'text'],
    ['phone', 'Phone Number', 'tel'],
    ['parent_name', 'Parent Name', 'text'],
    ['course', 'Course', 'text'],
    ['monthly_fee', 'Monthly Fee', 'number'],
    ['due_amount', 'Due Amount', 'number'],
    ['due_date', 'Due Date', 'date'],
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add Student
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Add a student and let AI analyze their payment risk.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(([name, label, type]) => (
              <div key={name}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {label}
                </label>

                <input
                  {...register(name)}
                  type={type}
                  className="input w-full"
                />

                {errors[name] && (
                  <p className="text-xs text-danger-500 mt-1">
                    {errors[name].message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Notes
            </label>

            <textarea
              {...register('notes')}
              rows={3}
              className="input w-full"
              placeholder="Optional notes..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || createStudent.isPending}
              className="btn-primary"
            >
              {createStudent.isPending
                ? 'Analyzing...'
                : 'Add Student'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}