"use client"

import {createContext, useContext, useReducer} from "react";
import {initialState, dashboardReducer} from "./dashboardReducer";


export const DashboardContext = createContext();
export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within DashboardProvider");
    }
    return context;
}

function DashboardProvider({children}) {

    const [state, dispatch] = useReducer(dashboardReducer, initialState);

    const setActiveMenu = (menu) => {
        dispatch({type: "SET_ACTIVE", payload: menu})
    }

    const openEmailForm = () => {
        dispatch({type: "OPEN_EMAIL_FORM"})
    }

    const closeEmailForm = () => {
        dispatch({type: "CLOSE_EMAIL_FORM"})
    }

    const openUserForm = () => {
        dispatch({type: "OPEN_USER_FORM"})
    }

    const closeUserForm = () => {
        dispatch({type: "CLOSE_USER_FORM"})
    }

    const openBankForm = () => {
        dispatch({type: "OPEN_BANK_FORM"})
    }

    const closeBankForm = () => {
        dispatch({type: "CLOSE_BANK_FORM"})
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
        <DashboardContext.Provider value={{
            ...state,
            dispatch,
            setActiveMenu,
            openEmailForm,
            closeEmailForm,
            openUserForm,
            closeUserForm,
            openBankForm,
            closeBankForm,
            setGender,
            setGenderDisplay,
            resetGender,
            openGenderList,
            closeGenderList,
        }}>
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardProvider;