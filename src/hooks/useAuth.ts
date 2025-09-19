import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
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
