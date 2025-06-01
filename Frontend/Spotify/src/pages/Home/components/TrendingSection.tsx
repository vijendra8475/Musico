import TrendingSectionSkeleton from "@/components/skeletons/TrendingSectionSkeleton"
import { useMusicStore } from "@/Store/useMusicStore";
import PlayButton from "../PlayButton";

const TrendingSection = () => {
    const { trendingSongs, isLoading, error } = useMusicStore();
    if (isLoading) return <TrendingSectionSkeleton />;

    if(error) return (
        <div className="text-red-500 text-center mt-4">
            <p>Error loading trending songs: {error}</p>
        </div>
    )

  return (
    <div className="mb-8">
        <section className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {trendingSongs.map((song) => (
                    <div 
                        key={song._id} 
                        className="cursor-pointer group relative overflow-hidden rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-900 p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="aspect-square overflow-hidden rounded-lg mb-4">
                            <img 
                                src={song.imageUrl} 
                                alt={song.title} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                            />
                        </div>
                        <h3 className="font-bold text-white truncate">{song.title}</h3>
                        <p className="text-gray-400 text-sm mt-1 truncate">{song.artist}</p>
                        <div className="absolute top-0 left-0 w-full h-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <PlayButton song={song} queue={trendingSongs} />
                        
                    </div>
                ))}
            </div>
        </section>
    </div>
  )
}

export default TrendingSection;
