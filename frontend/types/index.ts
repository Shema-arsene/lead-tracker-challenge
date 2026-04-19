export type LeadStatus = "NEW" | "CONTACTED" | "IN_PROGRESS" | "WON" | "LOST"

export interface Lead {
  _id: string
  name: string
  email?: string
  company?: string
  status: LeadStatus
  value?: number
  notes?: string
  createdAt: string
  updatedAt: string
  comments?: Comment[]
}

export interface Comment {
  _id: string
  text: string
  leadId: string
  createdAt: string
  updatedAt?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface LeadFilters {
  page?: number
  limit?: number
  status?: LeadStatus
  q?: string
  sort?: "createdAt" | "updatedAt"
  order?: "asc" | "desc"
}
