import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getAbsence, postAbsenceIn, postAbsenceOut } from "../api/absenceApi";

export const useAbsence = (shiftId: number, page: number = 1, filter: string) => {
    return useQuery({
        queryKey: ["absences", shiftId, page, filter],
        queryFn: () => getAbsence(shiftId, page, filter),
        enabled: !!shiftId,
    });
};

// 🔥 hook untuk absen masuk
export const useAbsenceIn = () => {
    const queryClient = useQueryClient();
    const [modal, setModal] = useState<{
        visible: boolean;
        type: "success" | "error" | null;
        title: string;
        message: string;
    }>({
        visible: false,
        type: null,
        title: "",
        message: "",
    });

    const mutation = useMutation({
        mutationFn: ({ rfidCode, shiftId }: { rfidCode: string; shiftId: number }) =>
            postAbsenceIn(rfidCode, shiftId),
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["absences"] });
            setModal({
                visible: true,
                type: "success",
                title: "Berhasil Masuk",
                message: res?.message || "Absen berhasil masuk",
            });
        },
        onError: (err: any) => {
            const msg =
                err?.response?.data?.message || "Terjadi kesalahan saat absen masuk";
            setModal({
                visible: true,
                type: "error",
                title: "Gagal Masuk",
                message: msg,
            });
        },
    });

    return { ...mutation, modal, setModal };
};

// 🔥 hook untuk absen keluar
export const useAbsenceOut = () => {
    const queryClient = useQueryClient();
    const [modal, setModal] = useState<{
        visible: boolean;
        type: "success" | "error" | null;
        title: string;
        message: string;
    }>({
        visible: false,
        type: null,
        title: "",
        message: "",
    });

    const mutation = useMutation({
        mutationFn: ({ rfidCode }: { rfidCode: string }) => postAbsenceOut(rfidCode),
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["absences"] });
            setModal({
                visible: true,
                type: "success",
                title: "Berhasil Keluar",
                message: res?.message || "Absen berhasil keluar",
            });
        },
        onError: (err: any) => {
            const msg =
                err?.response?.data?.message || "Terjadi kesalahan saat absen keluar";
            setModal({
                visible: true,
                type: "error",
                title: "Gagal Keluar",
                message: msg,
            });
        },
    });

    return { ...mutation, modal, setModal };
};
