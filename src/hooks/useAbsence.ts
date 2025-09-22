import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { getAbsence, postAbsenceIn, postAbsenceOut } from "../api/absenceApi";

export const useAbsence = (shiftId: number, page: number = 1, filter: string) => {
    return useQuery({
        queryKey: ["absences", shiftId, page, filter],
        queryFn: () => getAbsence(shiftId, page, filter),
        enabled: !!shiftId,
    });
};

// hook untuk absen masuk
export const useAbsenceIn = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ rfidCode, shiftId }: { rfidCode: string; shiftId: number }) =>
            postAbsenceIn(rfidCode, shiftId),
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["absences"] });

            Toast.show({
                type: "success",
                text1: "Berhasil Masuk",
                text2: res?.message || "Absen berhasil masuk",
                position: "top",
                visibilityTime: 2000,
            });
        },
        onError: (err: any) => {
            const msg =
                err?.response?.data?.message || "Terjadi kesalahan saat absen masuk";

            Toast.show({
                type: "error",
                text1: "Gagal Masuk",
                text2: msg,
                position: "top",
                visibilityTime: 2000,
            });
        },
    });
};

// hook untuk absen keluar
export const useAbsenceOut = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ rfidCode }: { rfidCode: string }) => postAbsenceOut(rfidCode),
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["absences"] });

            Toast.show({
                type: "success",
                text1: "Berhasil Keluar",
                text2: res?.message || "Absen berhasil keluar",
                position: "top",
                visibilityTime: 2000,
            });
        },
        onError: (err: any) => {
            const msg =
                err?.response?.data?.message || "Terjadi kesalahan saat absen keluar";

            Toast.show({
                type: "error",
                text1: "Gagal Keluar",
                text2: msg,
                position: "top",
                visibilityTime: 2000,
            });
        },
    });
};
