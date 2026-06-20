type Status = 'completed' | 'in_progress' | 'pending' | 'approved' | 'cancelled'

interface StatusConfig {
  label: string
  className: string
}

const STATUS_MAP: Record<Status, StatusConfig> = {
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-700',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-blue-100 text-blue-700',
  },
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-700',
  },
  approved: {
    label: 'Approved',
    className: 'bg-emerald-100 text-emerald-700',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-700',
  },
}

export function getStatus(status: string): string {
  const defaultClass = 'inline-block w-24 rounded py-1 text-center'

  const config = STATUS_MAP[status as Status] ?? {
    label: 'Unknown',
    className: 'bg-gray-100 text-gray-700',
  }

  return `
    <span class="${defaultClass} ${config.className}">
      ${config.label}
    </span>
  `.trim()
}
