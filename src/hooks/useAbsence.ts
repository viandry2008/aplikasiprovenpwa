import { useQuery } from "@tanstack/react-query";
import { getShifts } from "../api/shiftApi";

export const useShifts = () => {
    return useQuery({
        queryKey: ["shifts"],
        queryFn: getShifts,
    });
};
