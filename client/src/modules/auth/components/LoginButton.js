"use client"

import styles from "./LoginButton.module.css";
import Image from "next/image";
import profile from "@/auth/images/profile.png";
import arrowDown from "@/auth/images/arrow-downn.png"
import smallProfile from "@/auth/images/smallprofile.png";
import account from "@/auth/images/pr.png"
import sigIn from "@/auth/images/sign in button.png"
import logOut from "@/auth/images/filogout.png"
import moon from "@/auth/images/moon-8.png"
import sun from "@/auth/images/sun-2.png"
import {useAuth} from "@/auth/context/AuthContextProvider";
import {useGetUserData} from "@/tour/hooks/useGetUserData";
import {useRef} from "react";
import Link from "next/link";
import {useQueryClient} from "@tanstack/react-query";
import api from "@/core/services/config"
import {useRouter} from "next/navigation";
import useClickOutside from "@/shared/hooks/useClickOutside";


function LoginButton() {

    const {state, openAuthModal, toggleDropDown, closeDropDown, toggleTheme} = useAuth();
    const accountRef = useRef(null);
    const queryClient = useQueryClient();
    const router = useRouter();


    const {data} = useGetUserData();

    const logOutHandler = () => {
        document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        delete api.defaults.headers.common["Authorization"];
        queryClient.removeQueries(["user-data"]);
        queryClient.invalidateQueries(["user-data"]);
        router.push("/");
    }

    const closeRef = useClickOutside(() => {
        closeDropDown();
    })

    if (data) {
        return (
            <>
                <div className={styles.profileBox} onClick={() => toggleDropDown()} ref={closeRef}>
                    <Image className={styles.user} src={profile} width={24} height={24} alt="login-logo"/>
                    <p>
                        {data?.mobile}
                    </p>
                    <Image className={styles.arrowDown} src={arrowDown} width={24} height={24} alt="down-icon"/>
                </div>
                {state.dropDown && (
                    <div ref={accountRef} className={styles.dropDownBox}>
                        <div className={styles.smallProfileBox}>
                            <Image
                                className={styles.smallProfile}
                                src={smallProfile}
                                width={25}
                                height={25}
                                alt="user-icon"
                            />
                            <p>{data?.mobile}</p>
                        </div>
                        <div className={styles.themeBox} onClick={() => toggleTheme()}>
                            {state.theme === "dark"
                                ? (
                                    <>
                                        <Image
                                            className={styles.lightModeIcon}
                                            src={sun}
                                            width={19}
                                            height={19}
                                            alt="sun-icon"
                                        />
                                        <p>حالت روشن</p>
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            className={styles.darkModeIcon}
                                            src={moon}
                                            width={18}
                                            height={18}
                                            alt="moon-icon"
                                        />
                                        <p>حالت تاریک</p>
                                    </>
                                )}
                        </div>
                        <div className={styles.accountInfoBox} onClick={() => closeDropDown()}>
                            <Image
                                className={styles.accountInfo}
                                src={account}
                                width={20}
                                height={20}
                                alt="account-icon"
                            />
                            <Link className={styles.toAccount} href="/profile">اطلاعات حساب کاربری</Link>
                        </div>
                        <div className={styles.border}></div>
                        <div className={styles.logOutBox} onClick={() => {
                            closeDropDown();
                            logOutHandler();
                        }}>
                            <Image
                                className={styles.logOut}
                                src={logOut}
                                width={20}
                                height={20}
                                alt="logout-icon"
                            />
                            <p>خروج از حساب کاربری</p>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            <div className={styles.logInBtn} onClick={() => openAuthModal()}>
                <Image src={profile} width={24} height={24} alt="login-logo"/>
                <p>
                    ورود | ثبت نام
                </p>
            </div>
            <div className={styles.signIn} onClick={() => openAuthModal()}>
                <Image src={sigIn} width={40} height={40} alt="logIn-icon"/>
            </div>
        </>
    );
}

export default LoginButton;