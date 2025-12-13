"use client"

import * as Yup from "yup";
import {useGetUserData} from "@/tour/hooks/useGetUserData";
import {useEditUserForm} from "@/dashboard/hooks/useEditUserForm";
import {useDashboard} from "@/dashboard/context/DashboardProvider";
import {useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import useClickOutside from "@/shared/hooks/useClickOutside";
import styles from "@/dashboard/components/UserAccountInfo.module.css";
import Image from "next/image";
import edit from "@/dashboard/images/edit-2.png";
import UserInfo from "@/dashboard/components/UserInfo";
import BankAccountInfo from "@/dashboard/components/BankAccountInfo";

const schema = Yup.object({
    email: Yup.string().required("ایمیل الزامی است").email("ایمیل نامعتبر است"),
})

export default function UserAccountInfo() {

    const {data} = useGetUserData();
    const {mutate, isPending} = useEditUserForm();
    const {showEmailForm, openEmailForm, closeEmailForm} = useDashboard();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {email: ""},
    });

    const submitHandler = (formData) => {
        if (isPending) return;
        mutate(formData, {
            onSuccess: (data) => {
                toast.success(data?.message, {
                    duration: 5000,
                    position: "top-left",
                    style: {
                        fontFamily: "'YekanBakh-Regular', 'Helvetica', 'Arial', sans-serif",
                        fontSize: "17px",
                        padding: "10px",
                    }
                })
                queryClient.invalidateQueries(["user-data"]);
                reset();
                closeEmailForm();
            },
            onError: (data) => {
                toast.error(data?.message, {
                    duration: 5000,
                    position: "top-left",
                    style: {
                        fontFamily: "'YekanBakh-Regular', 'Helvetica', 'Arial', sans-serif",
                        fontSize: "17px",
                        padding: "10px",
                    }
                })
            }
        })
    }

    const formRef = useClickOutside(closeEmailForm);

    return (
        <div className={styles.formContainer}>
            <div className={styles.accountBox}>
                <p className={styles.accountTitle}>اطلاعات حساب کاربری</p>
                <div className={styles.userMobileBox}>
                    <div className={styles.userMobile}>
                        <p>شماره موبایل</p>
                        <p>{data?.mobile}</p>
                    </div>
                    <form onSubmit={handleSubmit(submitHandler)} ref={formRef} className={styles.userEmailBox}>
                        {showEmailForm ? (
                            <div className={styles.emailInputBox}>
                                <input
                                    className={errors.email ? styles.error : ""}
                                    {...register("email")}
                                    placeholder="آدرس ایمیل"
                                />
                                <button type="submit">تایید</button>
                            </div>
                        ) : (
                            <>
                                <div
                                    className={`${styles.userEmail} ${data?.email ? styles.hasEmail : styles.noEmail}`}>
                                    <p>ایمیل</p>
                                    {data?.email ? (<p>{data?.email}</p>) : (<span></span>)}
                                </div>
                                <div className={styles.editBox} onClick={() => openEmailForm()}>
                                    <Image src={edit} width={16} height={16} alt="edit-icon"/>
                                    <button type="button">افزودن</button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
            <UserInfo/>
            <BankAccountInfo/>
        </div>
    );
}