interface StatCardProps {
  title: string
  current: number
  max: number
  unit?: string
  helpText?: string
}

function StatCard({ title, current, max, unit = "", helpText }: StatCardProps) {
  const percentage = (current / max) * 100

  return (
    <div className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm text-gray-400">{title}</h3>
        {helpText && (
          <div className="flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-gray-600 text-xs text-gray-400">
            ?
          </div>
        )}
      </div>
      <div className="mb-2">
        <span className="text-2xl text-white">{current}</span>
        <span className="ml-1 text-sm text-gray-400">
          / {max}
          {unit}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export function UsageStats() {
  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl text-white">Usage</h2>
      <div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-900 md:grid-cols-3">
        <StatCard title="Locations" current={1} max={3} helpText="Number of locations used" />
        <StatCard title="Databases" current={1} max={500} helpText="Number of databases created" />
        <StatCard
          title="Storage"
          current={20}
          max={8000}
          unit=" KB"
          helpText="Storage space used"
        />
      </div>
    </div>
  )
}
