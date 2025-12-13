import axios from "axios";
import {getCookie} from "@/core/utils/cookie";
import {setCookie} from "@/core/utils/cookie";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (request) => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
            request.headers["authorization"] = `Bearer ${accessToken}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            (error.response.status === 401 || error.response.status === 403) &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const res = await getNewTokens();
            if (res?.status === 200) {
                const newToken = res?.data?.accessToken
                setCookie("accessToken", newToken, 30);
                api.defaults.headers.common["authorization"] = `Bearer ${newToken}`;
                originalRequest.headers["authorization"] = `Bearer ${newToken}`;
                return api(originalRequest);
            }
        }

        return Promise.reject(error?.response?.data);
    }
);

export default api;

const getNewTokens = async () => {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) return;

    try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refreshToken,
        });
        return response;
    } catch (error) {
        return error;
    }
};
