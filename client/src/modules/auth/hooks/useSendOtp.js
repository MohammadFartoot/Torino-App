import api from "@/core/services/config"
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";


const sendOtp = async (data) => {
    return await api.post("/auth/send-otp", data);
}

export const useSendOtp = () => {
    return useMutation({
        mutationFn: sendOtp,
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
                console.error("Send Otp Mutation error:", error);
            }
        }
    })
}