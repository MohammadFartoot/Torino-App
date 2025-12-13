"use client";

import { useAuth } from "@/auth/context/AuthContextProvider";
import SendOtpModal from "@/auth/components/SendOtpModal";
import CheckOtpModal from "@/auth/components/CheckOtpModal";


export default function AuthModalContainer() {
    const { state } = useAuth();

    if (!state.authModal) return null;

    switch (state.step) {
        case 1:
            return <SendOtpModal/>;
        case 2:
            return <CheckOtpModal/>;
        default:
            return null;
    }
}
