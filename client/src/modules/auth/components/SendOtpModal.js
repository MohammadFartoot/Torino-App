"use client"

import Modal from "./Modal";
import {useAuth} from "@/auth/context/AuthContextProvider";
import styles from "./SendOtpModal.module.css"
import close from "@/auth/images/close.png"
import Image from "next/image";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSendOtp} from "@/auth/hooks/useSendOtp";
import toast from "react-hot-toast";

const schema = Yup.object().shape({
    number: Yup
        .string()
        .transform((value) => value.replace(/[۰-۹]/g, (d) =>
            String.fromCharCode(d.charCodeAt(0) - 1728))).trim()
        .required("لطفا فیلد خالی را پر کنید")
        .matches(/^0\d{10}$/, "شماره تلفن نامعتبر است")
})


export default function SendOtpModal() {

    const {state, setStep, setMobile, setCode, setTimeLeft, closeAuthModal} = useAuth();
    const {mutate, isPending} = useSendOtp();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {number: ""}
    });

    const submitHandler = (data) => {
        setMobile(data);
        if (isPending) return;

        mutate(
            {mobile: data.number},
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
                    reset();
                    setCode("");
                    setTimeLeft(120);
                    setStep(2);
                },
                onError: error => {
                    if (process.env.NODE_ENV === "development") {
                        console.error("Send OTP error:", error);
                    }
                }
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                {state.authModal && (
                    <Modal onClose={() => closeAuthModal()}>
                        <div className={styles.container}>
                            <Image
                                onClick={() => closeAuthModal()}
                                className={styles.img}
                                src={close}
                                width={34}
                                height={34}
                                alt="close-icon"/>
                            <p className={styles.title}>ورود به تورینو</p>
                            <div className={styles.numberBox}>
                                <p>شماره موبایل خود را وارد کنید</p>
                                <input
                                    {...register("number")}
                                    className={`${styles.numberBoxInput} ${errors.number ? styles.error : ""}`}
                                    placeholder="۴۲۵۳***۰۹۱۲"
                                    name="number"
                                />
                                {errors.number && <span>{errors.number.message}</span>}
                            </div>
                            <button
                                type="submit"
                                className={styles.btn}
                                disabled={isPending}
                            >
                                ارسال کد تایید
                            </button>
                        </div>
                    </Modal>
                )}
            </form>
        </>
    );
}
