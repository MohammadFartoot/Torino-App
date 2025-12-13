"use client";

import Modal from "./components/Modal"
import styles from "./AuthProviderModal.module.css"
import lock from "@/auth/images/padlock.png"
import {useEffect} from "react";
import {useAuth} from "@/auth/context/AuthContextProvider";
import Image from "next/image";
import Link from "next/link";
import {getCookie} from "@/core/utils/cookie";

function AuthProvider({children}) {

    const {state, openAlertModal} = useAuth();


    const token = getCookie("accessToken");
    const isAuthenticated = !!token;

    useEffect(() => {
        if (!isAuthenticated) {
            openAlertModal();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated && state?.alertModal) {
        return (
            <>
                {children}
                <Modal>
                    <div className={styles.wrapper}>
                        <Image src={lock} width={61} height={61} alt="lock-icon"/>
                        <div className={styles.textBox}>
                            <p>دسترسی شما به این صفحه مجاز نیست !</p>
                            <p>ابتدا وارد شوید</p>
                        </div>
                        <Link className={styles.link} href="/">صفحه اصلی</Link>
                    </div>
                </Modal>
            </>
        );
    }
    return children;
}

export default AuthProvider;
