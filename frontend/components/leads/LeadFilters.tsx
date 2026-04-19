import { LeadStatus } from "@/types"

interface LeadFiltersProps {
  search: string
  status: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export default function LeadFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: LeadFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by name, email, or company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="NEW">NEW</option>
          <option value="CONTACTED">CONTACTED</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="WON">WON</option>
          <option value="LOST">LOST</option>
        </select>
      </div>
    </div>
  )
}
