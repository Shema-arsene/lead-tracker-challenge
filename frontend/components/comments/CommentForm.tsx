import { useState } from "react"

interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [text, setText] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) {
      setError("Comment cannot be empty")
      return
    }
    if (text.length > 500) {
      setError("Comment must be less than 500 characters")
      return
    }

    setSubmitting(true)
    setError("")
    try {
      await onSubmit(text)
      setText("")
    } catch (err) {
      setError("Failed to add comment")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Add a comment
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment here..."
        maxLength={500}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">
          {text.length}/500 characters
        </span>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Adding..." : "Add Comment"}
        </button>
      </div>
    </form>
  )
}
