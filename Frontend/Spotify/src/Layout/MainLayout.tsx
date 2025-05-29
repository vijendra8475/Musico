import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";

  

const MainLayout = () => {
    const isMobile = false;
  return (
    <div className="h-screen w-full flex flex-col bg-black text-white">
      <ResizablePanelGroup direction="horizontal" className="h-screen flex overflow-hidden flex-1 p-4">
        <AudioPlayer />
        <ResizablePanel defaultSize={15} maxSize={20} minSize={isMobile ? 0 : 10}>
            <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        <ResizablePanel defaultSize={isMobile ? 80 : 70} >
            <div className="h-full overflow-y-auto hide-scrollbar">
                <Outlet />
            </div>
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        <ResizablePanel defaultSize={15} minSize={0} maxSize={20}>
            <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout