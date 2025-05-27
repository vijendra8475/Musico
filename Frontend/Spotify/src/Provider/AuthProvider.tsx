import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react"

const UpdateApiToke = (token: string | null) => {
    if(token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

export const AuthProvider = ({children} : { children : React.ReactNode}) => {
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const initAuth = async () => {
        try {
            const token = await getToken();
            UpdateApiToke(token);
        } catch (error:any) {
            console.log("Error fetching token:", error);
        }
        finally{
          setLoading(false);
        }
      }

      initAuth();
    }, [getToken])

    if(loading) return <div className="h-screen w-full flex items-center justify-center">
        <Loader  className="size-8 text-emerald-500 animate-spin"/>
    </div>
    else return <>{children}</>
    
}