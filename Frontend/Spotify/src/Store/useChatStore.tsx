import { axiosInstance } from '@/lib/axios';
import { Message } from '@/types';
import { User } from '@/types';
import { create } from 'zustand';
import { io } from 'socket.io-client';

interface ChatStore {
    users: any[],
    fetchUsers: () => Promise<void>,
    isLoading: boolean,
    error: string | null,
    socket: any,
    isConnected: boolean,
    onlineUsers: Set<string>,
    userActivities: Map<string, number>,
    messages: Message[];
    user : User | null,
    selectedUser : User | null,

    initlizeSocket: (userid: string) => void,
    disconnectSocket: () => void,
    sendMessage: (userId: string, receiverId: string, content: string) => void,
    fetchMessages: (userId: string) => void
    setSelectedUser : (user : User) => void

}

const baseUrl = 'http://localhost:5000'

const socket = io(baseUrl, {
    autoConnect: false,
    withCredentials: true,
    // transports : ['websocket']
});

export const useChatStore = create<ChatStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    socket: null,
    isConnected: false,
    onlineUsers: new Set(),
    userActivities: new Map(),
    messages: [],
    user : null,
    selectedUser : null,

    setSelectedUser : (user : User) => {
        set({ selectedUser : user})
    },

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/users'); // Adjust the API endpoint as needed

            set({ users: response.data.users });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
        finally {
            set({ isLoading: false });
        }
    },

    initlizeSocket: async (userId: string) => {
        if (!get().isConnected) {
            socket.auth = { userId }
            socket.connect();
            socket.emit('user_connected', userId)

            socket.emit('user_online', (users: string[]) => {
                set({ onlineUsers: new Set(users) })
            })

            socket.on('activites', (activities: [string, string][]) => {
                set: ({ userActivities: new Map(activities) })
            })

            socket.on('user_connected', (userId: string) => {
                set(state => ({
                    onlineUsers: new Set([...state.onlineUsers, userId])
                }))
            })

            socket.on('user_disconnected', (userId: string) => {
                set(state => {
                    const newOnlineUsers = new Set(state.onlineUsers);
                    newOnlineUsers.delete(userId);
                    return { onlineUsers: newOnlineUsers };
                })

            })

            socket.on('receive_message', (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message]
                }));
            })

            socket.on('message_sent', (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message]
                }))
            })

            socket.on('activity_update', ({ userId, activity }) => {
                set(state => {
                    const newActivities = new Map(state.userActivities)
                    newActivities.set(userId, activity)
                    return { userActivities: newActivities }
                })
            })

            set({ isConnected: true })
        }

    },


    disconnectSocket: () => {
        if(get().isConnected) {
            socket.disconnect();
            set({ isConnected : false})
        }
    },

    sendMessage: (senderId, receiverId, content) => {
        const socket = get().socket;
        if (socket) socket.emit('send_message', { senderId, receiverId, content });
    },

    fetchMessages : async (userId : string) => {
        set({ isLoading : true, error : null})
        try {
            const response = await axiosInstance.get(`/users/messages/${userId}`)
            set({ messages : response.data})
        } catch (error : any) {
            set({ error : error.response.data.message})
        }
        finally{
            set({ isLoading : false})
        }
    }
}))