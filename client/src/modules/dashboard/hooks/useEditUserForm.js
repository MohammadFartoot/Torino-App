import api from "@/core/services/config";
import {useMutation} from "@tanstack/react-query";

const editUserForm = async (data) => {
    const res = await api.put("/user/profile", data);
    return res.data;
}

export const useEditUserForm = () => {
    return useMutation({
        mutationFn: editUserForm,
    })
}