import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/Store/useMusicStore";
import { useEffect } from "react";

const HomePage = () => {
  const { isLoading, featuredSongs, madeForYouSongs, trendingSongs, fetchMadeForYouSongs, fetchTrendingSongs, fetchFeaturedSongs } = useMusicStore();


  useEffect(() => {
   fetchFeaturedSongs(),
   fetchMadeForYouSongs(),
   fetchTrendingSongs()
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  console.log("Featured Songs:", featuredSongs);
  console.log("Made For You Songs:", madeForYouSongs);
  console.log("Trending Songs:", trendingSongs);
  
  

  return (
    <div className="rounded-md overflow-hidden">
      <Topbar />
    </div>
  )
}

export default HomePage
