import api from "@/core/services/config"
import {setCookie} from "@/core/utils/cookie";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";


const checkOtp = async (data) => {
    return await api.post("/auth/check-otp", data);
}

export const useCheckOtp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: checkOtp,
        onSuccess: (data) => {
            setCookie("accessToken", data?.data?.accessToken, 30);
            setCookie("refreshToken", data?.data?.refreshToken, 365);
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ["user-data"] });
            }, 500);
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "خطایی رخ داده است";
            toast.error(message, {
                duration: 5000,
                position: "top-left",
                style: {
                    fontFamily: "'YekanBakh-Regular', 'Helvetica', 'Arial', sans-serif",
                    fontSize: "17px",
                    padding: "10px",
                }
            });
            if (process.env.NODE_ENV === "development") {
                console.error("Check Otp Mutation error:", error);
            }
        }
    })
}