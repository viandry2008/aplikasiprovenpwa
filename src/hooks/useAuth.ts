import { useMutation } from "@tanstack/react-query";
import { login, logout } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import { storage } from "../utils/storage";

export const useLogin = () => {
    const setUser = useAuthStore((state: any) => state.setUser);

    return useMutation({
        mutationFn: ({ username, password }: { username: string; password: string }) =>
            login(username, password),
        onSuccess: async (data) => {
            setUser(data.conntent);
            await storage.set("user", data.conntent);
        },
    });
};

export const useLogout = () => {
    const clearUser = useAuthStore((state) => state.logout);

    return useMutation({
        mutationFn: async () => {
            const token = (await storage.get("token")) as string | null;

            if (!token) {
                throw new Error("Token tidak ditemukan");
            }

            return await logout(token);
        },
        onSuccess: async () => {
            clearUser();
            await storage.remove("user");
            await storage.remove("token");
            await storage.remove("shift");
        },
    });
};
