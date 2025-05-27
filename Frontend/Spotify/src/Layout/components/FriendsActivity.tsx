import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/Store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Avatar } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HeadphonesIcon, User } from "lucide-react";
import { useEffect } from "react";

const FriendsActivity = () => {

  const { users, isLoading, fetchUsers, error } = useChatStore();
  const { user } = useUser()

  useEffect(() => {
    if(user) fetchUsers()
      console.log(users);
      
  }, [fetchUsers, user])
  

  return (
    <div className="h-full bg-zinc-900 flex flex-col rounded-lg">
      <div className="flex justify-between items-center p-4 border-b border-zinc-800">
        <User className="size-5 shrink-0" />
        <h2 className="font-semibold">What they're listening to</h2>
      </div>

      {!user && <LoginPrompt />}

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {
            Array.isArray(users) && users.map((user) => (
              <div key={user.id} className="cursor-pointer p-3 group hover:bg-zinc-800/50 rounded-md transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 border border-zinc-800">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                  </Avatar>

                  <div className="absolute bottom-0 right-0 h-3 w-3 border-2 rounded-full border-zinc-800  bg-zinc-500" aria-hidden="true" />
                </div>
              </div>
            ))
          }
        </div>

      </ScrollArea>
    </div>
  )
}

export default FriendsActivity


const LoginPrompt = () => (
	<div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
		<div className='relative'>
			<div
				className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
				aria-hidden='true'
			/>
			<div className='relative bg-zinc-900 rounded-full p-4'>
				<HeadphonesIcon className='size-8 text-emerald-400' />
			</div>
		</div>

		<div className='space-y-2 max-w-[250px]'>
			<h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
			<p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
		</div>
	</div>
);