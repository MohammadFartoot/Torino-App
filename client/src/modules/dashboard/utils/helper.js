import tours from "@/core/constants/tours"
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import airplane from "@/dashboard/images/airplane.png";
import ship from "@/dashboard/images/ship.png";
import train from "@/dashboard/images/train.png";
import bus from "@/dashboard/images/bbus.png";
import suv from "@/dashboard/images/suv.png";

dayjs.extend(jalaliday);

export const getPersianName = (englishName) => {
    const match = tours.find((t) => t.nameEn.toLowerCase() === englishName?.toLowerCase());
    return match ? match.nameFa : englishName;
}

export const formatJalaliDate = (date) => {
    return dayjs(date)
        .calendar("jalali")
        .locale("fa")
        .format("dddd D MMMM YYYY")
}

export const fullJalaliDate = (date) => {
    return dayjs(date)
        .calendar("jalali")
        .locale("fa")
        .format("HH:mm - YYYY/MM/DD")
}

export const getTourStatus = (startDate, endDate) => {
    const now = dayjs();
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (now.isBefore(start)) return "upcoming";
    if (now.isAfter(end)) return "finished";
}

export const vehicleIcons = {
    airplane,
    ship,
    train,
    bus,
    suv,
}

export const getVehicleIcon = (vehicle) => {
    return vehicleIcons[vehicle?.toLowerCase()] || airplane
}


export const splitName = (fullName) => {
    if (!fullName.length) {
        return {firstName: "", lastName: ""};
    }

    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
        return {firstName: parts[0], lastName: ""};
    }

    const lastName = parts.pop();
    const firstName = parts.join(" ")

    return {firstName, lastName}
}