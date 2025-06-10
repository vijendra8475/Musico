import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const AuthCallback = () => {

  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false)

  useEffect(() => {
    const syncUser = async () => {
      if(!isLoaded || !user || syncAttempted.current) return;

     try {
      syncAttempted.current = true;

      await axiosInstance.post('/auth/callback', {
        id : user.id,
        firstName : user.firstName,
        lastName : user.lastName,
        imageUrl : user.imageUrl
      })

     } catch (error) {
      console.log('Error in auth callback', error);
     }
     finally{
      navigate('/');
     }
    }

    syncUser();
  }, [ isLoaded, user, navigate ])
  

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <Card className="w-[90%] max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
       
        <CardContent className="flex flex-col items-center justify-center p-6 pt-6">
            <Loader className="size-8 text-emerald-500 animate-spin mb-4" />
            <h2 className="font-bold  text-xl text-zinc-400">Logging you in</h2>
            <p className="text-zinc-400 text-sm">Redirecting...</p>
        </CardContent>
        
        </Card>

    </div>
  )
}

export default AuthCallback
