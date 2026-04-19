import { Comment } from "@/types"
import EmptyState from "@/components/ui/EmptyState"

interface CommentListProps {
  comments: Comment[]
  onDelete?: (id: string) => void
}

export default function CommentList({ comments }: CommentListProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString()
  }

  if (comments.length === 0) {
    return (
      <EmptyState
        title="No comments yet"
        description="Be the first to add a comment to this lead"
      />
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start">
            <p className="text-gray-700">{comment.text}</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {formatDate(comment.createdAt)}
          </p>
        </div>
      ))}
    </div>
  )
}
