"use client"

import {createContext, useContext, useReducer} from "react";
import {initialState, tourReducer} from "@/tour/context/tourReducer";
import tours from "@/core/constants/tours";
import {highTrafficOrigins} from "@/core/constants/tours";
import {DateObject} from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export const TourContext = createContext();
export const useSearch = () => {
    const context = useContext(TourContext);
    if (!context) {
        throw new Error("useSearch must be used within TourProvider");
    }
    return context;
}


function TourProvider({children}) {

    const [state, dispatch] = useReducer(tourReducer, initialState);

    const setOriginQuery = (value) => {
        dispatch({
            type: "SET_ORIGIN_QUERY", payload: value,
        })
    }

    const setDestinationQuery = (value) => {
        dispatch({
            type: "SET_DESTINATION_QUERY", payload: value
        })
    }

    const setSuggestedOrigins = (value) => {
        const query = value.trim();
        const payload = query === "" ? tours.filter((c) => highTrafficOrigins.includes(c.nameFa)) : tours.filter(
            (c) => c.nameFa.includes(value))

        dispatch({type: "SET_SUGGESTED_ORIGINS", payload})
    }

    const setSuggestedDestinations = (value) => {
        dispatch({
            type: "SET_SUGGESTED_DESTINATIONS", payload: tours.filter((c) => c.nameFa.includes(value))
        })
    }

    const openSuggestedOrigins = () => {
        dispatch({type: "OPEN_SUGGESTED_ORIGINS"})
    }

    const closeSuggestedOrigins = () => {
        dispatch({type: "CLOSE_SUGGESTED_ORIGINS"})
    }

    const openSuggestedDestinations = () => {
        dispatch({type: "OPEN_SUGGESTED_DESTINATIONS"})
    }

    const closeSuggestedDestinations = () => {
        dispatch({type: "CLOSE_SUGGESTED_DESTINATIONS"})
    }

    const setDate = (range) => {
        if (!range) return;

        if (range.from && range.to) {
            const start = range.from.toISOString();
            const end = range.to.toISOString();
            dispatch({
                type: "SET_DATE",
                payload: { startDate: start, endDate: end },
            });
        } else if (range.from) {
            const start = range.from.toISOString();
            dispatch({
                type: "SET_DATE",
                payload: { startDate: start, endDate: null },
            });
        }
    };

    const getJalaliDate = () => ({
        start: state.startDate ? new Date(state.startDate) : null,
        end: state.endDate ? new Date(state.endDate) : null,
    });

    const resetSearch = () => {
        dispatch({type: "RESET_SEARCH"})
    }

    const setGender = (value) => {
        dispatch({type: "SET_GENDER", payload: value})
    }

    const setGenderDisplay = (value) => {
        dispatch({type: "SET_GENDER_DISPLAY", payload: value})
    }

    const resetGender = () => {
        dispatch({type: "RESET_GENDER_DISPLAY"})
    }

    const openGenderList = () => {
        dispatch({type: "OPEN_SUGGESTED_GENDER"})
    }

    const closeGenderList = () => {
        dispatch({type: "CLOSE_SUGGESTED_GENDER"})
    }

    return (
        <TourContext.Provider value={{
            state,
            dispatch,
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
            resetSearch,
            setGender,
            setGenderDisplay,
            resetGender,
            openGenderList,
            closeGenderList,
        }}>
            {children}
        </TourContext.Provider>);
}

export default TourProvider;