"use client"

import sun from "@/dashboard/images/sfog.png"
import styles from "./MyTours.module.css"
import {useGetUserTours} from "@/dashboard/hooks/useGetUserTours";
import Image from "next/image";
import {
    getPersianName,
    formatJalaliDate,
    getTourStatus,
    getVehicleIcon
} from "@/dashboard/utils/helper"


export default function MyTours() {

    const {data} = useGetUserTours();

    return (
        <>
            <div className={styles.container}>
                {data?.map((tour) => {
                    const originFa = getPersianName(tour.origin?.name);
                    const destinationFa = getPersianName(tour.destination?.name);
                    const status = getTourStatus(tour.startDate, tour.endDate);

                    return (
                        <div key={tour.id} className={styles.tourBox}>
                            <div className={styles.firstInnerBox}>
                                <div className={styles.tourTitle}>
                                    <Image src={sun} width={24} height={24} alt="sun"/>
                                    <p>{tour?.title}</p>
                                </div>
                                <div className={styles.vehicleWrapper}>
                                    <Image src={getVehicleIcon(tour.fleetVehicle)} width={24} height={24} alt="vehicle"
                                           style={{
                                               transform: tour.fleetVehicle?.toLowerCase() ===
                                               "airplane" ? "scale(1.25)" : "none"
                                           }}
                                    />
                                    <p>سفر با {tour?.fleetVehicleFa}</p>
                                </div>
                                <div className={styles.tourStatusWrapper}>
                                    {
                                        status === "upcoming"
                                            ? <p className={styles.upComing}>در حال برگزاری</p>
                                            : <p className={styles.finished}>به اتمام رسیده</p>
                                    }

                                </div>
                            </div>
                            <div className={styles.secondInnerBox}>
                                <div className={styles.dateWrapper}>
                                    <p>{originFa} به {destinationFa}</p>
                                    <span></span>
                                    <p>{formatJalaliDate(tour.startDate)}</p>
                                </div>
                                <div className={styles.secondDateWrapper}>
                                    <p>تاریخ برگشت</p>
                                    <span></span>
                                    <p>{formatJalaliDate(tour.endDate)}</p>
                                </div>
                            </div>
                            <div className={styles.borderLine}></div>
                            <div className={styles.thirdInnerBox}>
                                <div className={styles.tourIdWrapper}>
                                    <p>شماره تور</p>
                                    <p>{tour.id.slice(0, 8)}</p>
                                </div>
                                <div className={styles.secondBorderLine}></div>
                                <div className={styles.priceWrapper}>
                                    <p>مبلغ پرداخت شده</p>
                                    <p>{tour.price.toLocaleString("fa-IR")}<span>تومان</span></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.mobileContainer}>
                {data?.map((tour) => {
                    const originFa = getPersianName(tour.origin?.name);
                    const destinationFa = getPersianName(tour.destination?.name);
                    const status = getTourStatus(tour.startDate, tour.endDate);

                    return (
                        <div key={tour.id} className={styles.tourBox}>
                            <div className={styles.tourStatusWrapper}>
                                {
                                    status === "upcoming"
                                        ? <p className={styles.upComing}>در حال برگزاری</p>
                                        : <p className={styles.finished}>به اتمام رسیده</p>
                                }

                            </div>
                            <div className={styles.firstInnerBox}>
                                <div className={styles.tourTitle}>
                                    <Image src={sun} width={24} height={24} alt="sun"/>
                                    <p>{tour?.title}</p>
                                </div>
                                <div className={styles.vehicleWrapper}>
                                    <Image src={getVehicleIcon(tour.fleetVehicle)} width={24} height={24} alt="vehicle"
                                           style={{
                                               transform: tour.fleetVehicle?.toLowerCase() ===
                                               "airplane" ? "scale(1.25)" : "none"
                                           }}
                                    />
                                    <p>سفر با {tour?.fleetVehicleFa}</p>
                                </div>
                            </div>
                            <div className={styles.secondInnerBox}>
                                <div className={styles.dateWrapper}>
                                    <div>
                                        <p>{originFa} به {destinationFa}</p>
                                    </div>
                                    <div>
                                        <span></span>
                                        <p>{formatJalaliDate(tour.startDate)}</p>
                                    </div>
                                </div>
                                <div className={styles.secondDateWrapper}>
                                    <div>
                                        <p>تاریخ برگشت</p>
                                    </div>
                                    <div>
                                        <span></span>
                                        <p>{formatJalaliDate(tour.endDate)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.borderLine}></div>
                            <div className={styles.thirdInnerBox}>
                                <div className={styles.tourIdWrapper}>
                                    <p>شماره تور</p>
                                    <p>{tour.id.slice(0, 8)}</p>
                                </div>
                                <div className={styles.secondBorderLine}></div>
                                <div className={styles.priceWrapper}>
                                    <p>مبلغ پرداخت شده</p>
                                    <p>{tour.price.toLocaleString("fa-IR")}<span>تومان</span></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}