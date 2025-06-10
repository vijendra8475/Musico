import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/Store/useAuthStore";
import { useChatStore } from "@/Store/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react"

const updateApiToken = (token: string | null) => {
  if (token) {
    delete axiosInstance.defaults.headers.common["Authorization"];
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

export const AuthProvider = ({children} : { children : React.ReactNode}) => {
    const { getToken, userId } = useAuth()
    const [loading, setLoading] = useState(true);
    const { checkAdminStatus } = useAuthStore()
    const { initSocket, disconnectSocket }= useChatStore()

    useEffect(() => {
      const initAuth = async () => {
        try {
            const token = await getToken();
            updateApiToken(token);
            if(token) {
                await checkAdminStatus();
                // init socket
                if(userId) initSocket(userId);
            }
        } catch (error:any) {
            console.log("Error fetching token:", error);
        }
        finally{
          setLoading(false);
        }
      }

      initAuth();

      //clean up
      return () => disconnectSocket()
    }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket])

    if(loading) return <div className="h-screen w-full flex items-center justify-center">
        <Loader  className="size-8 text-emerald-500 animate-spin"/>
    </div>
    else return <>{children}</>
    
}