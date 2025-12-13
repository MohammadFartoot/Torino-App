import api from "@/core/services/config";
import {useMutation} from "@tanstack/react-query";


const checkout = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const res = await api.post("/order", data);
    return res.data;
}

export const useCheckout = () => {
    return useMutation({
        mutationFn: checkout,
    })
}