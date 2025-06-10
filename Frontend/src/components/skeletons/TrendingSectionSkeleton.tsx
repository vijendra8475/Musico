
const TrendingSectionSkeleton = () => {
  return (
    <div className="w-full mt-10">
        <h2 className="text-2xl font-bold mb-6 bg-neutral-800/50 w-48 h-8 rounded animate-pulse" />
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-neutral-800/50 rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-neutral-800/50 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-neutral-800/50 rounded animate-pulse opacity-75" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-neutral-800/50 rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 bg-neutral-800/50 rounded animate-pulse" />
                    <div className="h-3 w-1/3 bg-neutral-800/50 rounded animate-pulse opacity-75" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TrendingSectionSkeleton