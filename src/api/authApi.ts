import { ENDPOINTS } from "../constants/api";
import { LoginResponse } from "../utils/types";
import axiosInstance from "./axiosInstance";

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const res = await axiosInstance.post<LoginResponse>(ENDPOINTS.LOGIN, {
        username,
        password,
        as_login: 'project',
    });
    return res.data;
};
