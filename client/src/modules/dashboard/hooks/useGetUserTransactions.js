import api from "@/core/services/config"
import {useQuery} from "@tanstack/react-query";

const getUserTransactions = async () => {
    const res = await api.get("/user/transactions");
    return res.data;
}

export const useGetUserTransactions = () => {
    return useQuery({
        queryKey: ["user-transactions"],
        queryFn: getUserTransactions,
    })
}