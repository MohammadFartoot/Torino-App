import Image from "next/image";
import styles from "./TourDetailsPage.module.css"
import userIcon from "@/tour/images/user-tick.png"
import planIcon from "@/tour/images/map.png"
import medalIcon from "@/tour/images/medal-star.png"
import originIcon from "@/tour/images/routing-2.png"
import startDateIcon from "@/tour/images/calendarsmall.png"
import endDateIcon from "@/tour/images/calendar-2.png"
import capacityIcon from "@/tour/images/profile-2user.png"
import insuranceIcon from "@/tour/images/security.png"
import ReserveButton from "@/tour/components/ReserveButton";
import {getPersianName, formatJalaliDate, getVehicleIcon} from "@/dashboard/utils/helper"


export default function TourDetailsPage({data, id}) {

    return (
        <div className={styles.container}>
            <div className={styles.tourContainer}>
                <Image className={styles.img} src={data.image} width={397} height={265} alt="tour-image"/>
                <div>
                    <p className={styles.title}>{data.title}</p>
                    <p className={styles.options}>{data.time}</p>
                    <div className={styles.description}>
                        <div className={styles.userBox}>
                            <Image src={userIcon} width={24} height={24} alt="user-icon"/>
                            <p>تورلیدر از مبدا</p>
                        </div>
                        <div className={styles.planBox}>
                            <Image src={planIcon} width={24} height={24} alt="map-icon"/>
                            <p>برنامه سفر</p>
                        </div>
                        <div className={styles.medalBox}>
                            <Image src={medalIcon} width={24} height={24} alt="medal-icon"/>
                            <p>تضمین کیفیت</p>
                        </div>
                    </div>
                    <div className={styles.reserveBox}>
                        <p>{data.price.toLocaleString("fa-IR")}<span> تومان</span></p>
                        <ReserveButton id={id}/>
                    </div>
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.originBox}>
                    <div className={styles.origin}>
                        <Image src={originIcon} width={20} height={20} alt="origin-icon"/>
                        <p>مبدا</p>
                    </div>
                    <p>{getPersianName(data.origin?.name)}</p>
                </div>
                <div className={styles.border}></div>
                <div className={styles.startDateBox}>
                    <div className={styles.startDate}>
                        <Image src={startDateIcon} width={20} height={20} alt="date-icon"/>
                        <p>تاریخ رفت</p>
                    </div>
                    <p>{formatJalaliDate(data.startDate)}</p>
                </div>
                <div className={styles.border}></div>
                <div className={styles.endDateBox}>
                    <div className={styles.endDate}>
                        <Image src={endDateIcon} width={20} height={20} alt="date-icon"/>
                        <p>تاریخ برگشت</p>
                    </div>
                    <p>{formatJalaliDate(data.endDate)}</p>
                </div>
                <div className={styles.border}></div>
                <div className={styles.vehicleBox}>
                    <div className={styles.vehicle}>
                        <Image src={getVehicleIcon(data.fleetVehicle)} width={23} height={23} alt="vehicle"
                               style={{
                                   transform: data.fleetVehicle?.toLowerCase() === "airplane" ? "scale(1.25)" : "none"
                               }}
                        />
                        <p>حمل و نقل</p>
                    </div>
                    <p>{data.fleetVehicleFa}</p>
                </div>
                <div className={styles.border}></div>
                <div className={styles.capacityBox}>
                    <div className={styles.capacity}>
                        <Image src={capacityIcon} width={20} height={20} alt="date-icon"/>
                        <p>ظرفیت</p>
                    </div>
                    <p> حداکثر <span>{data.availableSeats}</span> نفر </p>
                </div>
                <div className={styles.capacityBorder}></div>
                <div className={styles.insuranceBox}>
                    <div className={styles.insurance}>
                        <Image src={insuranceIcon} width={20} height={20} alt="date-icon"/>
                        <p>بیمه</p>
                    </div>
                    <p>{data.insurance === true ? "دارد" : "ندارد"}</p>
                </div>
            </div>
        </div>
    );
}