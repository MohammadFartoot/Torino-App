"use client"

import styles from "./UserInfo.module.css";
import Image from "next/image";
import edit from "@/dashboard/images/edit-2.png";
import calendar from "@/tour/images/calendarrr.png"
import arrowDown from "@/tour/images/arrow-down.png"
import {useDashboard} from "@/dashboard/context/DashboardProvider";
import useClickOutside from "@/shared/hooks/useClickOutside";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css"
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import {useEditUserForm} from "@/dashboard/hooks/useEditUserForm";
import toast from "react-hot-toast";
import {userFieldSchema} from "@/dashboard/utils/userFormSchema"
import {useQueryClient} from "@tanstack/react-query";
import {useGetUserData} from "@/tour/hooks/useGetUserData";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import {splitName} from "@/dashboard/utils/helper";

dayjs.extend(jalaliday);

function UserInfo() {

    const {data} = useGetUserData();
    const {mutate, isPending} = useEditUserForm();
    const queryClient = useQueryClient();

    const {
        showUserForm,
        openUserForm,
        closeUserForm,
        suggestedGendersList,
        setGender,
        genderDisplay,
        setGenderDisplay,
        resetGender,
        openGenderList,
        closeGenderList
    } = useDashboard();

    const convertGender = {"مرد": "male", "زن": "female", "سایر": "other"};
    const reverseGender = Object.fromEntries(
        Object.entries(convertGender).map(([fa, en]) => [en, fa])
    );

    const birthDateFa = data?.birthDate
        ? dayjs(data.birthDate).calendar("jalali").format("YYYY/MM/DD")
        : "";

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(userFieldSchema),
        defaultValues:
            {fullName: "", nationalCode: "", birthDate: "", gender: ""},
    });


    const formRef = useClickOutside(closeGenderList);

    const submitHandler = (formData) => {
        if (isPending) return;

        const {firstName, lastName} = splitName(formData.fullName);

        const payload = {
            ...formData,
            firstName,
            lastName,
        }

        mutate(payload, {
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
                resetGender();
                closeUserForm();
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
        <div className={`${styles.userInfoBox} ${showUserForm ? styles.expandForm : ""}`}>
            <div className={styles.innerBox}>
                <p className={styles.userInfoTitle}>اطلاعات شخصی</p>
                {!showUserForm && (
                    <div className={styles.userEditBox} onClick={() => openUserForm()}>
                        <Image src={edit} width={16} height={16} alt="edit-icon"/>
                        <button>ویرایش اطلاعات</button>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                {showUserForm ? (
                    <>
                        <div className={styles.userFormBox}>
                                <input
                                    className={`${styles.fullNameInput} ${errors.fullName ? styles.error : ""}`}
                                    {...register("fullName")}
                                    placeholder="نام و نام خانوادگی"
                                    name="fullName"
                                />
                                <input
                                    className={`${styles.nationalCodeInput} ${errors.nationalCode ? styles.error : ""}`}
                                    {...register("nationalCode")}
                                    placeholder="کدملی"
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
                                <label>جنسیت</label>
                                <Image className={styles.arrowImg} src={arrowDown} width={12} height={12}
                                       alt="arrow-icon"/>
                                <input className={`${styles.genderInput} ${errors.gender ? styles.error : ""}`}
                                       {...register("gender")}
                                       name="gender"
                                       value={genderDisplay}
                                       readOnly
                                       onFocus={() => openGenderList()}
                                />
                            </div>
                            {suggestedGendersList && (
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
                        <div className={styles.border}></div>
                        <div className={styles.btnBox}>
                            <button type="submit">تایید</button>
                            <button onClick={() => closeUserForm()}>انصراف</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.secondInnerBox}>
                            <div className={styles.fullName}>
                                <p>نام و نام خانوادگی</p>
                                {data?.fullName ? (<p>{data?.fullName}</p>) : (<span></span>)}
                            </div>
                            <div className={styles.nationalCode}>
                                <p>کدملی</p>
                                {data?.nationalCode ? (<p>{data?.nationalCode}</p>) : (<span></span>)}
                            </div>
                        </div>
                        <div className={styles.thirdInnerBox}>
                            <div className={styles.gender}>
                                <p>جنسیت</p>
                                {data?.gender ? (<p>{reverseGender[data?.gender]}</p>) : (<span></span>)}
                            </div>
                            <div className={`${data?.birthDate ? styles.birthDate : styles.noBirthDate}`}>
                                <p>تاریخ تولد</p>
                                {data?.birthDate ? (<p>{birthDateFa}</p>) : (<span></span>)}
                            </div>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default UserInfo;