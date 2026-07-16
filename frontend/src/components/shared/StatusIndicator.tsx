import React from 'react'

interface StatusIndicatorProps {
  label: string
  status: 'active' | 'inactive' | 'loading'
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ label, status }) => {
  const statusColors = {
    active: 'bg-status-success-bg text-status-success border-status-success-border',
    inactive: 'bg-status-info-bg text-status-info border-status-info-border',
    loading: 'bg-status-warning-bg text-status-warning border-status-warning-border animate-pulse',
  }

  const dotColors = {
    active: 'bg-status-success',
    inactive: 'bg-status-info',
    loading: 'bg-status-warning',
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs font-medium ${statusColors[status]}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotColors[status]}`} />
      <span>{label}</span>
    </div>
  )
}
