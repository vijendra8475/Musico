import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import { useEffect, useState } from "react";



const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    }

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile); // Listen for resize events
    return () => {
      window.removeEventListener('resize', checkMobile); // Cleanup listener on unmount
    }
  }, [isMobile])

  return (
    <div className="h-screen w-full flex flex-col bg-black text-white">
      <ResizablePanelGroup direction="horizontal" className="h-screen flex overflow-hidden flex-1 p-4 pl-0">
        <AudioPlayer />
        <ResizablePanel defaultSize={isMobile ? 20 : 10} maxSize={20} minSize={isMobile ? 0 : 10}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        <ResizablePanel defaultSize={isMobile ? 80 : 70} >
          <div className="h-full overflow-y-auto hide-scrollbar">
            <Outlet />
          </div>
        </ResizablePanel>

        {
          !isMobile && (
            <>
              <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

              <ResizablePanel defaultSize={20} minSize={0} maxSize={20} collapsedSize={0} >
                <FriendsActivity />
              </ResizablePanel>
            </>
          )
        }
      </ResizablePanelGroup>
      <PlaybackControls />
    </div>
  )
}

export default MainLayout