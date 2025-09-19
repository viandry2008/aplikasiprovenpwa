// api/authApi.ts
import { ENDPOINTS } from "../constants/api";
import axiosInstance from "./axiosInstance";

export const login = async (username: string, password: string) => {
    const res = await axiosInstance.post(ENDPOINTS.LOGIN, {
        username,
        password,
        as_login: "project",
    });
    return res.data;
};

export const logout = async (token: string) => {
    const res = await axiosInstance.post(
        ENDPOINTS.LOGOUT,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data;
};
