import axios from "axios"
import { Lead, Comment, PaginatedResponse, LeadFilters } from "@/types"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Leads APIs
export const leadsApi = {
  getAll: async (filters: LeadFilters): Promise<PaginatedResponse<Lead>> => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString())
      }
    })
    const response = await api.get(`/leads?${params.toString()}`)
    return response.data
  },

  getById: async (id: string): Promise<Lead> => {
    const response = await api.get(`/leads/${id}`)
    return response.data
  },

  create: async (data: Partial<Lead>): Promise<Lead> => {
    const response = await api.post("/leads", data)
    return response.data
  },

  update: async (id: string, data: Partial<Lead>): Promise<Lead> => {
    const response = await api.patch(`/leads/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/leads/${id}`)
  },
}

// Comments APIs
export const commentsApi = {
  getAll: async (leadId: string): Promise<Comment[]> => {
    const response = await api.get(`/leads/${leadId}/comments`)
    return response.data
  },

  create: async (leadId: string, text: string): Promise<Comment> => {
    const response = await api.post(`/leads/${leadId}/comments`, { text })
    return response.data
  },
}
