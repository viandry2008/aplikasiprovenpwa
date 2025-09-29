// export const API_BASE_URL = "http://127.0.0.1:8000/api/"; // Localhost
export const API_BASE_URL = "https://test.smarthrm-provenforceindonesia.site/api/"; // testing server

export const ENDPOINTS = {
    LOGIN: "login",
    LOGOUT: "logout",
    GET_SHIFT: "get-shift",
    GET_ABSENCE: (shiftId: number, page: number = 1, filter: string) =>
        `rfid/absen/${shiftId}?page=${page}&filter=${filter}`,
    POST_ABSENCE_IN: "rfid/masuk",
    POST_ABSENCE_OUT: "rfid/keluar",
};