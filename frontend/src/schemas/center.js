import { z } from 'zod'

export const centerSchema = z.object({
  name: z.string().min(2, 'Center name must be at least 2 characters').max(200),
  owner_name: z.string().min(2, 'Owner name is required').max(200),
  owner_phone: z.string().min(10, 'Valid phone required').max(20),
  address: z.string().max(500).optional().or(z.literal('')),
})

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})