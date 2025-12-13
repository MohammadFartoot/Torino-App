import api from "@/core/services/config"
import {useQuery} from "@tanstack/react-query";


const getUserData = async () => {
    const res = await api.get("/user/profile");
    return res.data;
};

export const useGetUserData = () => {
    return useQuery({
        queryKey: ["user-data"],
        queryFn: () => getUserData(),
    })
}