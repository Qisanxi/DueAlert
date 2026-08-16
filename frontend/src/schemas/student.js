import { z } from 'zod'

export const studentSchema = z.object({
  name: z.string().min(1, 'Student name is required'),
  phone: z.string().min(10, 'Valid phone required'),
  parent_name: z.string().min(1, 'Parent name is required'),
  course: z.string().min(1, 'Course is required'),
  monthly_fee: z.coerce.number().min(0, 'Must be positive'),
  due_amount: z.coerce.number().min(0, 'Must be positive'),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format: YYYY-MM-DD'),
  notes: z.string().optional().or(z.literal('')),
})