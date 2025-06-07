

const UsersListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-neutral-800 animate-pulse transition-all duration-300 hover:scale-105" />
            <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse transition-all duration-300 hover:brightness-110" />
                <div className="h-3 w-24 bg-neutral-800 rounded animate-pulse transition-all duration-300 hover:brightness-110" />
            </div>
            </div>
        ))}
        </div>
  )
}

export default UsersListSkeleton