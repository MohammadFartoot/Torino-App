"use client"

import origin from "@/tour/images/location.png";
import destination from "@/tour/images/global-search.png";
import date from "@/tour/images/calendar.png";
import styles from "@/tour/components/TourSearch.module.css";
import Image from "next/image";
import tours from "@/core/constants/tours";
import {useSearch} from "@/tour/context/TourProvider";
import useClickOutside from "@/shared/hooks/useClickOutside";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {DatePicker} from "zaman";


dayjs.extend(utc);

export default function TourSearch({data, onSearch}) {

    const {
        state,
        setOriginQuery,
        setDestinationQuery,
        setSuggestedOrigins,
        setSuggestedDestinations,
        openSuggestedOrigins,
        closeSuggestedOrigins,
        openSuggestedDestinations,
        closeSuggestedDestinations,
        setDate,
        getJalaliDate,
    } = useSearch();

    const {start, end} = getJalaliDate();

    const combineTours = data.map(tour => {
        const originCity = tours.find(t => t.id === tour.origin.id) || {nameFa: tour.origin.name, id: tour.origin.id};
        const destinationCity = tours.find(t => t.id === tour.destination.id) ||
            {nameFa: tour.destination.name, id: tour.destination.id};

        return {
            ...tour,
            origin: {...tour.origin, id: originCity.id, nameFa: originCity.nameFa},
            destination: {...tour.destination, id: destinationCity.id, nameFa: destinationCity.nameFa}
        };
    });


    const originChangeHandler = (event) => {
        const value = event.target.value;
        setOriginQuery(value);
        setSuggestedOrigins(value);
    };

    const destinationChangeHandler = (event) => {
        const value = event.target.value;
        setDestinationQuery(value);
        setSuggestedDestinations(value);
    };

    const changeDateHandler = (range) => {
        setDate(range);
    }


    const filterTour = (tours, filters) => {
        return tours.filter(tour => {
            const tourStart = new Date(tour.startDate);
            const tourEnd = new Date(tour.endDate);

            if (filters.startDate && filters.endDate) {
                const userStart = new Date(filters.startDate);
                const userEnd = new Date(filters.endDate);
                return userStart <= tourEnd && userEnd >= tourStart;
            }
            return true;
        });
    };

    const searchHandler = () => {
        const normalize = (str) => str?.trim();
        const originId = tours.find(c => normalize(c.nameFa) === normalize(state.originQuery))?.id;
        const destinationId = tours.find(c => normalize(c.nameFa) === normalize(state.destinationQuery))?.id;

        if (!originId || !destinationId || !state.startDate) return;


        const params = {
            originId,
            destinationId,
            startDate: dayjs(state.startDate).format("YYYY-MM-DD"),
            ...(state.endDate ? {endDate: dayjs(state.endDate).format("YYYY-MM-DD")} : {})
        };

        onSearch(params);
    };

    const pathRef = useClickOutside(() => {
        closeSuggestedOrigins();
        closeSuggestedDestinations();
    });


    return (
        <>
            <div className={styles.searchBox} ref={pathRef}>
                <div className={styles.originBoxWrapper}>
                    <div className={styles.originBox}>
                        <Image src={origin} width={20} height={20} alt="origin-icon"/>
                        <input
                            value={state.originQuery}
                            onChange={(event) => {
                                originChangeHandler(event);
                                openSuggestedOrigins();
                            }}
                            onClick={(event) => {
                                openSuggestedOrigins();
                                setSuggestedOrigins(event.target.value)
                            }}
                            placeholder="مبدا"
                        />
                    </div>
                    {!!(state.suggestedOriginsList && state.suggestedOrigins?.length) &&
                        (<div className={styles.suggestedOrigins}>
                            {!state.originQuery && <div className={styles.highTraffic}><p>شهرهای پرتردد</p></div>}
                            {state.suggestedOrigins?.map(c => (<div className={styles.suggestedBox} key={c.id}>
                                <div className={styles.suggestedNames} onClick={() => {
                                    setOriginQuery(c.nameFa);
                                    closeSuggestedOrigins();
                                }}>
                                    <Image src={origin} width={20} height={20} alt="origin-icon"/>
                                    <p>
                                        {c.nameFa}
                                    </p>
                                </div>
                            </div>))}
                        </div>)}
                </div>
                <div className={styles.firstBlock}></div>
                <div className={styles.destinationBoxWrapper}>
                    <div className={styles.destinationBox}>
                        <Image src={destination} width={20} height={20} alt="destination-icon"/>
                        <input
                            value={state.destinationQuery}
                            onChange={(event) => {
                                destinationChangeHandler(event);
                                openSuggestedDestinations();
                            }}
                            placeholder="مقصد"
                        />
                    </div>
                    {!!(state.suggestedDestinationsList && state.suggestedDestinations?.length) &&
                        (<div className={styles.suggestedDestinations}>
                            {state.suggestedDestinations?.map(c => (<div className={styles.suggestedBox} key={c.id}>
                                <div className={styles.suggestedNames} onClick={() => {
                                    setDestinationQuery(c.nameFa);
                                    closeSuggestedDestinations();
                                }}>
                                    <Image src={origin} width={20} height={20} alt="origin-icon"/>
                                    <p>
                                        {c.nameFa}
                                    </p>
                                </div>
                            </div>))}
                        </div>)}
                </div>
                <div className={styles.secondBlock}></div>
                <div className={styles.dateBox}>
                    {!start && (
                        <>
                            <Image src={date} width={20} height={20} alt="date-icon"/>
                            <p>تاریخ</p>
                        </>
                    )}
                    <DatePicker
                        className={styles.calendarPose}
                        range
                        onChange={(range) => changeDateHandler(range)}
                        value={{from: start, to: end}}
                        round="x2"
                        input={false}
                        customShowDateFormat="DD"
                        accentColor="#0aa22d"
                        position="center"
                        inputClass="custom-date-input"
                        direction="rtl"
                        locale="fa"
                    />
                </div>
                <div className={styles.searchBtn} onClick={() => searchHandler()}>
                    <p>جستجو</p>
                </div>
            </div>
        </>
    );
}