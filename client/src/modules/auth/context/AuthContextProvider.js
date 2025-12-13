"use client"

import {createContext, useContext, useReducer} from "react";
import {initialState, authReducer} from "./authReducer";

export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return context;
}


function AuthContextProvider({children}) {

    const [state, dispatch] = useReducer(authReducer, initialState);

    const openAuthModal = () => {
        dispatch({type: "OPEN_AUTH_MODAL"})
    }

    const closeAuthModal = () => {
        dispatch({type: "CLOSE_AUTH_MODAL"})
    }

    const setStep = (value) => {
        dispatch({type: "SET_STEP", payload: value})
    }

    const setMobile = (data) => {
        dispatch({type: "SET_MOBILE", payload: data.number})
    }

    const setCode = (code) => {
        dispatch({type: "SET_CODE", payload: code})
    }

    const setTimeLeft = (value) => {
        dispatch({type: "SET_TIMELEFT", payload: value})
    }

    const toggleDropDown = () => {
        dispatch({type: "TOGGLE_DROPDOWN"})
    }

    const closeDropDown = () => {
        dispatch({type: "CLOSE_DROPDOWN"})
    }

    const openAlertModal = () => {
        dispatch({type: "OPEN_ALERT_MODAL"})
    }

    const closeAlertModal = () => {
        dispatch({type: "CLOSE_ALERT_MODAL"})
    }

    return (
        <AuthContext.Provider value={{
            state,
            dispatch,
            openAuthModal,
            closeAuthModal,
            setStep,
            setMobile,
            setCode,
            setTimeLeft,
            toggleDropDown,
            closeDropDown,
            openAlertModal,
            closeAlertModal,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;