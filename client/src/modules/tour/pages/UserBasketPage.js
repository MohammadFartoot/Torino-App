"use client"

import {useGetBasket} from "@/tour/hooks/useGetBasket";
import styles from "./UserBasketPage.module.css"
import emptyBasket from "@/tour/images/shopping-cart.png"
import Image from "next/image";
import Link from "next/link";
import profile from "@/tour/images/blackprofile.png"
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import calendar from "@/tour/images/calendarrr.png"
import arrowDown from "@/tour/images/arrow-down.png"
import {useSearch} from "@/tour/context/TourProvider";
import {useCheckout} from "@/tour/hooks/useCheckout";
import toast from "react-hot-toast";
import useClickOutside from "@/shared/hooks/useClickOutside";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css"
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import spinner from "@/shared/images/spinner.gif"
import torino from "@/shared/images/TorinoBG.png"
import {userFieldSchema} from "@/dashboard/utils/userFormSchema";
import {useGetUserData} from "@/tour/hooks/useGetUserData";


export default function UserBasketPage() {

    const {data} = useGetBasket();
    const router = useRouter();
    const {data: userData} = useGetUserData();
    const {state, setGender, setGenderDisplay, resetGender, openGenderList, closeGenderList} = useSearch();
    const {mutate, isPending} = useCheckout();
    const convertGender = {"مرد": "male", "زن": "female", "سایر": "other"};

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(userFieldSchema),
        defaultValues:
            {
                fullName: userData?.fullName || "",
                nationalCode: userData?.nationalCode || "",
                birthDate: userData?.birthDate || "",
                gender: userData?.gender || "",
            },
    });

    const formRef = useClickOutside(closeGenderList);

    if (!data || data.length === 0) {
        return (
            <div className={styles.noData}>
                <p>سبد خرید شما خالی است</p>
                <Image className={styles.img} src={emptyBasket} width={250} height={250} alt="icon"/>
                <Link className={styles.link} href="/">نمایش تور ها</Link>
            </div>
        );
    }

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
                reset();
                resetGender();
                router.push("/");
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
        <>
            {isPending && (
                <div className={styles.overlay}>
                    <div className={styles.loaderBox}>
                        <Image className={styles.torinoBG} src={torino} width={146} height={44} alt="torino-logo"/>
                        <Image src={spinner} alt="spinner" width={100} height={100}/>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit(submitHandler)} className={styles.container}>
                <div className={styles.userInfoBox}>
                    <div className={styles.userInfo}>
                        <Image src={profile} width={24} height={24} alt="profile-icon"/>
                        <p>مشخصات مسافر</p>
                    </div>
                    <div className={styles.allInputs}>
                        <input className={`${styles.nameInput} ${errors.fullName ? styles.error : ""}`}
                               {...register("fullName")}
                               placeholder="نام و نام خانوادگی"
                               name="fullName"
                        />
                        <input className={`${styles.nationalCodeInput} ${errors.nationalCode ? styles.error : ""}`}
                               {...register("nationalCode")}
                               placeholder="کد ملی"
                               name="nationalCode"
                        />
                        <div className={styles.birthDateWrapper}>
                            <Image className={styles.calendarImg} src={calendar} width={16} height={16}
                                   alt="calendar-icon"/>
                            <DatePicker
                                calendar={persian}
                                locale={persian_fa}
                                className="green"
                                inputClass={`${styles.birthDateInput} ${errors.birthDate ? styles.error : ""}`}
                                calendarPosition="bottom-right"
                                value={state.birthDateValue}
                                onChange={(dateObj) => {
                                    if (!dateObj) {
                                        setValue("birthDate", "");
                                        return;
                                    }
                                    const gregorianDate = dateObj.convert(gregorian).format("YYYY-MM-DD");
                                    setValue("birthDate", gregorianDate, {shouldValidate: true});
                                }}
                                placeholder="تاریخ تولد"
                            />
                        </div>
                        <div className={styles.genderInputWrapper} ref={formRef}>
                            <Image className={styles.arrowImg} src={arrowDown} width={12} height={12}
                                   alt="arrow-icon"/>
                            <input className={`${styles.genderInput} ${errors.gender ? styles.error : ""}`}
                                   {...register("gender")}
                                   placeholder="جنسیت"
                                   name="gender"
                                   value={state.genderDisplay}
                                   readOnly
                                   onClick={() => openGenderList()}
                            />
                        </div>
                        {state.suggestedGendersList && (
                            <div className={styles.suggestedGendersList}>
                                {["مرد", "زن", "سایر"].map(item => (
                                    <div className={styles.suggestedBox} key={item} onClick={() => {
                                        setGenderDisplay(item);
                                        const genderEn = convertGender[item];
                                        setValue("gender", genderEn), setGender(item), closeGenderList()
                                    }}>
                                        <p>{item}</p>
                                    </div>
                                ))}
                            </div>)}
                    </div>
                </div>
                <div className={styles.userBasket}>
                    <div className={styles.tourInfo}>
                        <p>{data.title}</p>
                        <p>{data.time}</p>
                    </div>
                    <div className={styles.border}></div>
                    <div className={styles.priceInfo}>
                        <p>قیمت نهایی</p>
                        <p>{data.price.toLocaleString("fa-IR")}<span>تومان</span></p>
                    </div>
                    <button type="submit" disabled={isPending} className={styles.btn}>ثبت و خرید نهایی</button>
                </div>
            </form>
        </>
    );
};