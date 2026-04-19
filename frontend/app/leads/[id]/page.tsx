"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { leadsApi, commentsApi } from "@/lib/api"
import { Lead, Comment } from "@/types"
import CommentList from "@/components/comments/CommentList"
import CommentForm from "@/components/comments/CommentForm"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import ErrorAlert from "@/components/ui/ErrorAlert"
import { ArrowLeft, FilePenLine, Trash2 } from "lucide-react"

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [lead, setLead] = useState<Lead | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [leadData, commentsData] = await Promise.all([
        leadsApi.getById(id),
        commentsApi.getAll(id),
      ])
      setLead(leadData)
      setComments(commentsData)
    } catch (err) {
      setError("Failed to load lead details")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this lead? This will also delete all comments.",
      )
    ) {
      return
    }

    try {
      await leadsApi.delete(id)
      router.push("/leads")
    } catch (err) {
      alert("Failed to delete lead")
    }
  }

  const handleAddComment = async (text: string) => {
    try {
      await commentsApi.create(id, text)
      fetchData()
    } catch (err) {
      alert("Failed to add comment")
      throw err
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.push("/leads")}
            className="fixed top-5 left-5 flex items-center mt-4 px-2 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2" />
            Back to Leads
          </button>

          <ErrorAlert
            message={error || "Lead not found"}
            onRetry={() => router.push("/leads")}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
          <p className="text-gray-600 mt-1">
            Created {new Date(lead.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Lead Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{lead.email || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Company</p>
            <p className="font-medium">{lead.company || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium">{lead.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Value</p>
            <p className="font-medium">
              {lead.value
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(lead.value)
                : "-"}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Notes</p>
            <p className="font-medium whitespace-pre-wrap">
              {lead.notes || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <CommentList comments={comments} />
        <CommentForm onSubmit={handleAddComment} />
      </div>

      <div className="flex justify-between items-start mt-6">
        <button
          onClick={() => router.push("/leads")}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 cursor-pointer"
        >
          <ArrowLeft className="mr-2" />
          Back
        </button>

        <div className="flex space-x-3">
          <button
            onClick={() => router.push(`/leads/${id}/edit`)}
            className="flex items-center px-2 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 cursor-pointer"
          >
            <FilePenLine className="mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
          >
            <Trash2 className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
