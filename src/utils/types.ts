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

export interface AttendanceResponse {
    status: boolean;
    code: number;
    message: string;
    data: Attendance[];
    meta: Meta;
}

export interface Attendance {
    id: number;
    user_id: number;
    karyawan_id: number;
    tanggal: string; // format: YYYY-MM-DD
    jam_masuk: string;
    jam_keluar: string | null;
    shift_id: number;
    id_client: string;
    created_at: string;
    updated_at: string;
    karyawan: Karyawan;
}

export interface Karyawan {
    id: number;
    id_karyawan: string;
    nama_karyawan: string;
}

export interface Meta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

