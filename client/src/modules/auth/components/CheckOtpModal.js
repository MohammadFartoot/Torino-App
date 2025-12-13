"use client"

import {useAuth} from "@/auth/context/AuthContextProvider";
import {useCheckOtp} from "@/auth/hooks/useCheckOtp";
import toast from "react-hot-toast";
import Modal from "@/auth/components/Modal";
import Image from "next/image";
import styles from "@/auth/components/CheckOtpModal.module.css";
import arrowLeft from "@/auth/images/Line arrow-left.png";
import OtpInput from "react18-input-otp";
import {useEffect} from "react";
import {useSendOtp} from "@/auth/hooks/useSendOtp";


export default function CheckOtpModal() {

    const {state, setStep, setCode, setTimeLeft, closeAuthModal} = useAuth();
    const {mutate, isPending} = useCheckOtp();
    const sendOtp = useSendOtp();

    const submitHandler = (e) => {
        e.preventDefault();
        if (isPending) return;

        mutate(
            {mobile: state.mobile, code: state.code},
            {
                onSuccess: () => {
                    setCode("");
                    setStep(1);
                    closeAuthModal();
                    toast.success("ورود به حساب کاربری", {
                        duration: 5000,
                        position: "top-left",
                        style: {
                            fontFamily: "'YekanBakh-Regular', 'Helvetica', 'Arial', sans-serif",
                            fontSize: "17px",
                            padding: "10px",
                        }
                    })
                },
                onError: (error) => {
                    if (process.env.NODE_ENV === "development") {
                        console.error("Check OTP error:", error);
                    }
                }
            });
    }

    const changeHandler = (code) => {
        setCode(code);
    }

    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const formatted = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;


    const resendOtpHandler = () => {
        setTimeLeft(120);
        if (sendOtp.isPending) return;

        sendOtp.mutate(
            {mobile: state.mobile},
            {
                onSuccess: (res) => {
                    toast(res?.data?.code, {
                        duration: 5000,
                        position: "top-left",
                        style: {
                            fontFamily: "'YekanBakh-Regular', 'Helvetica', 'Arial', sans-serif",
                            fontSize: "17px",
                            padding: "10px",
                        }
                    });
                    toast.success(res?.data?.message, {
                        duration: 5000,
                        position: "top-left",
                        style: {
                            fontFamily: "'YekanBakh-Regular', 'Helvetica', 'Arial', sans-serif",
                            fontSize: "17px",
                            padding: "10px",
                        }
                    });
                }
            })

    }


    useEffect(() => {
        if (state.timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(state.timeLeft - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [state.timeLeft]);


    return (
        <>
            <form onSubmit={submitHandler}>
                {state.authModal && state.step === 2 && (
                    <Modal onClose={() => closeAuthModal()}>
                        <div className={styles.container}>
                            <Image
                                onClick={() => setStep(1)}
                                className={styles.img}
                                src={arrowLeft}
                                width={34}
                                height={34}
                                alt="arrowLeft-icon"/>
                            <p className={styles.title}>کد تایید را وارد کنید</p>
                            <p className={styles.text}>
                                کد تایید به شماره
                                <span>{state.mobile}</span>
                                ارسال شد
                            </p>
                            <div className={styles.input}>
                                <OtpInput
                                    className={styles.otpInput}
                                    value={state.code}
                                    onChange={changeHandler}
                                    numInputs={6}
                                    inputStyle={{
                                        border: "1px solid silver",
                                        borderRadius: "5px",
                                        width: "58px",
                                        height: "53px",
                                        fontSize: "16px",
                                        textAlign: "center",
                                        color: "#000",
                                        backgroundColor: "#fff",
                                    }}
                                />
                            </div>
                            {state.timeLeft > 0
                                ? (
                                    <>
                                        <p className={styles.resend}>
                                            <span>{formatted}</span>
                                            تا ارسال مجدد کد
                                        </p>
                                        <button
                                            type="submit"
                                            className={styles.btn}
                                            disabled={isPending}
                                        >
                                            ورود به تورینو
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => resendOtpHandler()}
                                        type="button"
                                        className={styles.btn}
                                        disabled={sendOtp.isPending}
                                    >
                                        ارسال مجدد کد
                                    </button>
                                )}
                        </div>
                    </Modal>
                )}
            </form>
        </>
    );
}