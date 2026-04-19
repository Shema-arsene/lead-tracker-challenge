interface ErrorAlertProps {
  message: string
  onRetry?: () => void
}

export default function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <div className="flex items-center justify-between">
        <div className="text-red-800">
          <strong>Error:</strong> {message}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}
