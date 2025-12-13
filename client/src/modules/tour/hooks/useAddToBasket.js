import api from "@/core/services/config"
import {useMutation} from "@tanstack/react-query";


const addToBasket = async (id) => {
    const res = await api.put(`/basket/${id}`);
    return res.data;
};

export const useAddToBasket = () => {
    return useMutation({
        mutationFn: addToBasket,
    })
}