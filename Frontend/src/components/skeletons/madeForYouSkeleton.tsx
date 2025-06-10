const MadeForYouSkeleton = () => {
  return (
    <div>
      <div className='animate-pulse rounded' />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className='bg-neutral-800 p-4 rounded-lg group relative'>
            <div className='relative'>
              <div className='w-full aspect-square bg-neutral-600 animate-pulse rounded-lg mb-4' />
              <div className='absolute bottom-4 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='bg-green-500 rounded-full p-3 hover:scale-105 transition-transform'>
                  <svg className='w-4 h-4 text-black' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>
              </div>
            </div>
            <div className='w-3/4 h-3 bg-neutral-600 animate-pulse rounded mb-2' />
            <div className='w-1/2 h-3 bg-neutral-600 animate-pulse rounded' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MadeForYouSkeleton;
