import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
    isLoading : boolean;
    isAdmin : boolean;
    error : string | null;

    checkAdminStatus: () => Promise<void>;
    reser : () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isLoading: false,
    isAdmin: false,
    error: null,

    checkAdminStatus: async () => {
        set({ isLoading: true, error: null });
        try {
            // Simulate an API call to check admin status
            const response = await axiosInstance.get('/admin/check'); // Adjust the API endpoint as needed
            set({ isAdmin: response.data.admin, isLoading: false });
        } catch (error : any) {
            set({ error: error.message, isLoading: false });
        }
    },

    reser: () => set({ isLoading: false, isAdmin: false, error: null }),
}))