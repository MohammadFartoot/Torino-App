import api from "@/core/services/config"
import {useQuery} from "@tanstack/react-query";


const getBasket = async () => {
    const res = await api.get("/basket");
    return res.data;
};

export const useGetBasket = () => {
    return useQuery({
        queryKey: ["user-basket"],
        queryFn: () => getBasket(),
    })
}