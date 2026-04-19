"use client"

import { useState, useEffect } from "react"
import { leadsApi } from "@/lib/api"
import { Lead, LeadStatus } from "@/types"
import LeadTable from "@/components/leads/LeadTable"
import LeadFilters from "@/components/leads/LeadFilters"
import LeadPagination from "@/components/leads/LeadPagination"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import ErrorAlert from "@/components/ui/ErrorAlert"
import EmptyState from "@/components/ui/EmptyState"
import { useRouter } from "next/navigation"

export default function LeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await leadsApi.getAll({
        page,
        limit,
        q: search || undefined,
        status: (status || undefined) as LeadStatus | undefined,
      })
      setLeads(response.items)
      setTotalPages(response.totalPages)
      setTotal(response.total)
    } catch (err) {
      setError("Failed to load leads. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [page, search, status])

  const handleViewLead = (id: string) => {
    router.push(`/leads/${id}`)
  }

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 1) setPage(1)
      else fetchLeads()
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  if (loading && leads.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <button
          onClick={() => router.push("/leads/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          + Create Lead
        </button>
      </div>

      <LeadFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {error && <ErrorAlert message={error} onRetry={fetchLeads} />}

      {!loading && leads.length === 0 && !error && (
        <EmptyState
          title="No leads found"
          description={
            search || status
              ? "Try adjusting your filters"
              : "Get started by creating your first lead"
          }
          action={
            !search && !status
              ? {
                  label: "Create Lead",
                  onClick: () => router.push("/leads/create"),
                }
              : undefined
          }
        />
      )}

      {leads.length > 0 && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {leads.length} of {total} leads
          </div>
          <LeadTable leads={leads} onView={handleViewLead} />
          <LeadPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
