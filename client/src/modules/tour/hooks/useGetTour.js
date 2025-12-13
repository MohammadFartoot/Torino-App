import api from "@/core/services/config"
import {useQuery} from "@tanstack/react-query";


const getTour = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `/tour${query ? `?${query}` : ""}`;
    const res = await api.get(url);
    return res.data;
};

export const useGetTour = (params = {}) => {
    return useQuery({
        queryKey: ["tour", params],
        queryFn: () => getTour(params),
    })
}