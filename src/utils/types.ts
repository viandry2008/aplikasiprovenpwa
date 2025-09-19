export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    roles: string;
    divisi: string;
    token: string;
}

export interface LoginResponse {
    pesan: string;
    conntent: User;
}

export interface Shift {
    id: number;
    type: string;
    ke: string;
    waktu_mulai: string;
    waktu_selesai: string;
}

export interface ShiftResponse {
    status: boolean;
    code: number;
    message: string;
    data: Shift[];
}
