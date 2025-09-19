import { ENDPOINTS } from "../constants/api";
import { ShiftResponse } from "../utils/types";
import axiosInstance from "./axiosInstance";

export const getShifts = async (): Promise<ShiftResponse> => {
    const res = await axiosInstance.get<ShiftResponse>(ENDPOINTS.GET_SHIFT);
    return res.data;
};
