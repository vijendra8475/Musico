import Topbar from "@/components/Topbar";
import { useChatStore } from "@/Store/useChatStore"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { UsersList } from "./components/UsersList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ChatHeader from "./components/ChatHeader";
import { MessageInput } from "./components/MessageInput";


const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Chats = () => {
  const { user } = useUser();
  const { messages, fetchMessages, fetchUsers, selectedUser } = useChatStore()

  useEffect(() => {
    if (user) fetchUsers()
  }, [fetchUsers, user])

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId)
  }, [selectedUser, fetchMessages])



  return (
    <main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
      <Topbar />

      <div className='grid lg:grid-cols-[250px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
        <UsersList />

        {/* chat message */}
        <div className='flex flex-col h-full'>
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className="h-[cals(100vh-440px)]" >
                <div className="flex flex-col gap-2">
                  {
                    messages.map(message => (
                      <div key={message._id} className={`flex items-center gap-3 ${message.senderId === user?.id ? 'flex-row-reverse' : ''}`} >

                        <Avatar className="size-8" >
                          <AvatarImage
                            src={message.senderId === user?.id ? user?.imageUrl : selectedUser?.imageUrl}
                            className="size-8"
                          />
                        </Avatar>

                        <div className={`rounded-lg p-3 max-w-[70%] ${message.senderId === user?.id ? 'bg-zinc-500' : 'bg-zinc-800'}`}>
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs text-zinc-300 mt-1 block">
                            {message.createdAt && formatTime(message.createdAt)}
                          </span>
                        </div>

                      </div>
                    ))
                  }
                </div>
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  )
}

const NoConversationPlaceholder = () => (
  <div className='flex flex-col items-center justify-center h-full space-y-2'>
    <img src='/icon.png' alt='Spotify' className='size-48 animate-bounce' />
    <div className='text-center'>
      <h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
      <p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
    </div>
  </div>
);

export default Chats
