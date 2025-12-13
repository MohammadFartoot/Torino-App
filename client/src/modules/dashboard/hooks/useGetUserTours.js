import api from "@/core/services/config"
import {useQuery} from "@tanstack/react-query";

const getUserTours = async () => {
    const res = await api.get("/user/tours");
    return res.data;
}

export const useGetUserTours = () => {
    return useQuery({
        queryKey: ["user-tours"],
        queryFn: getUserTours,
    })
}