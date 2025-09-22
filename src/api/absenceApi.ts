import { ENDPOINTS } from "../constants/api";
import { AttendanceResponse } from "../utils/types";
import axiosInstance from "./axiosInstance";

// Ambil token dari localStorage user
const getToken = () => {
    const userData = localStorage.getItem("user");
    if (!userData) return null;

    try {
        const parsed = JSON.parse(userData); // parse JSON
        return parsed?.token || null; // ambil token
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
};

export const postAbsenceIn = async (rfidCode: string, shiftId: number) => {
    const token = getToken();

    const res = await axiosInstance.post(
        ENDPOINTS.POST_ABSENCE_IN,
        {
            rfid_code: rfidCode,
            shift_id: shiftId,
        },
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        }
    );

    return res.data;
};

export const postAbsenceOut = async (rfidCode: string) => {
    const token = getToken();

    const res = await axiosInstance.post(
        ENDPOINTS.POST_ABSENCE_OUT,
        {
            rfid_code: rfidCode,
        },
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        }
    );

    return res.data;
};

export const getAbsence = async (
    shiftId: number,
    page: number = 1,
    filter: string
): Promise<AttendanceResponse> => {
    const token = getToken();

    const res = await axiosInstance.get<AttendanceResponse>(
        ENDPOINTS.GET_ABSENCE(shiftId, page, filter),
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        }
    );

    return res.data;
};
