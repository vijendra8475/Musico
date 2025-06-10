import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/Store/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeatureSection";
import MadeForYouSection from "./components/MadeForYouSection";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import TrendingSection from "./components/TrendingSection";

const HomePage = () => {
  const { fetchMadeForYouSongs, fetchTrendingSongs, fetchFeaturedSongs } = useMusicStore();


  useEffect(() => {
   fetchFeaturedSongs(),
   fetchMadeForYouSongs(),
   fetchTrendingSongs()
  }, []);
 
  

  return (
    <main className="rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900 text-white ">
      <Topbar />
      <ScrollArea className=" p-4">
        <div className="p-4 sm:p-6">
          <h1 className="text-3xl font-semibold mb-6">Welcome to Musico</h1>
          <FeaturedSection />
          <MadeForYouSection />
          <TrendingSection />
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage
