"use client"

import styles from "./BankAccountInfo.module.css";
import Image from "next/image";
import edit from "@/dashboard/images/edit-2.png";
import {useDashboard} from "@/dashboard/context/DashboardProvider";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {bankFieldSchema} from "@/dashboard/utils/bankFormSchema"
import toast from "react-hot-toast";
import {useEditUserForm} from "@/dashboard/hooks/useEditUserForm";
import {useQueryClient} from "@tanstack/react-query";
import {useGetUserData} from "@/tour/hooks/useGetUserData";

function BankAccountInfo() {

    const {data} = useGetUserData();
    const {showBankForm, openBankForm, closeBankForm} = useDashboard();
    const {mutate, isPending} = useEditUserForm();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(bankFieldSchema),
        defaultValues: {
            payment: {
                shaba_code: "", debitCard_code: "", accountIdentifier: ""
            },
        },
    });

    const submitHandler = (formData) => {
        if (isPending) return;
        mutate(formData.payment, {
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
                queryClient.invalidateQueries(["user-data"])
                reset();
                closeBankForm();
            },
            onError: (error) => {
                toast.error(error.message, {
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

    return (
        <div className={`${styles.cardInfoBox} ${showBankForm ? styles.expandForm : ""}`}>
            <div className={styles.cardInnerBox}>
                <p className={styles.cardInfoTitle}>اطلاعات حساب بانکی</p>
                {!showBankForm && (
                    <div className={styles.userEditBox} onClick={() => openBankForm()}>
                        <Image src={edit} width={16} height={16} alt="edit-icon"/>
                        <button>ویرایش اطلاعات</button>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                {showBankForm ? (
                    <>
                        <div className={styles.bankFormBox}>
                            <div className={`${styles.wrapper} ${styles.shebaCodeWrapper}`} >
                                <input
                                    className={`${styles.shebaCodeInput} ${errors.payment?.shaba_code ? styles.error : ""}`}
                                    {...register("payment.shaba_code")}
                                    placeholder="شماره شبا"
                                    name="payment.shaba_code"
                                />
                                <span>IR</span>
                                <p className={`${styles.errMsg} ${errors.payment?.shaba_code ? styles.visible : ""}`}>
                                    {errors.payment?.shaba_code?.message || ""}
                                </p>
                            </div>
                            <div className={`${styles.wrapper} ${styles.cardNumberWrapper}`}>
                                <input
                                    className={`${styles.cardNumberInput} ${errors.payment?.debitCard_code ? styles.error : ""}`}
                                    {...register("payment.debitCard_code")}
                                    placeholder="شماره کارت"
                                    name="payment.debitCard_code"
                                />
                                <p className={`${styles.errMsg} ${errors.payment?.debitCard_code ? styles.visible : ""}`}>
                                    {errors.payment?.debitCard_code?.message || ""}
                                </p>
                            </div>
                            <div className={`${styles.wrapper} ${styles.accountNumberWrapper}`}>
                                <input
                                    className={`${styles.accountNumberInput} ${errors.payment?.accountIdentifier ? styles.error : ""}`}
                                    {...register("payment.accountIdentifier")}
                                    placeholder="شماره حساب"
                                    name="payment.accountIdentifier"
                                />
                                <p className={`${styles.errMsg} ${errors.payment?.accountIdentifier ? styles.visible : ""}`}>
                                    {errors.payment?.accountIdentifier?.message || ""}
                                </p>
                            </div>
                        </div>
                        <div className={styles.border}></div>
                        <div className={styles.btnBox}>
                            <button type="submit">تایید</button>
                            <button onClick={() => closeBankForm()}>انصراف</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.secondCardInnerBox}>
                            <div className={styles.shebaNumber}>
                                <p>شماره شبا</p>
                                {data?.shaba_code ? (<p>{data?.shaba_code}</p>) : (<span></span>)}
                            </div>
                            <div className={styles.cardNumber}>
                                <p>شماره کارت</p>
                                {data?.debitCard_code ? (<p>{data?.debitCard_code}</p>) : (<span></span>)}
                            </div>
                        </div>
                        <div className={styles.thirdCardInnerBox}>
                            <div className={styles.bankAccountNumber}>
                                <p>شماره حساب</p>
                                {data?.accountIdentifier ? (<p>{data?.accountIdentifier}</p>) : (<span></span>)}
                            </div>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default BankAccountInfo;