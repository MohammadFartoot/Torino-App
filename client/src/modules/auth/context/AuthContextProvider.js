"use client"

import {createContext, useContext, useReducer, useEffect} from "react";
import {initialState, authReducer} from "./authReducer";


export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return context;
}

const init = () => {

    if (typeof window === "undefined") {
        return initialState;
    }

    const savedTheme = localStorage.getItem("theme");
    return {
        ...initialState,
        theme: savedTheme ? savedTheme : initialState.theme
    };
};

function AuthContextProvider({children}) {

    const [state, dispatch] = useReducer(authReducer, initialState, init);

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

    const toggleTheme = () => {
        dispatch({type: "TOGGLE_THEME"})
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", state.theme);
        localStorage.setItem("theme", state.theme);
    }, [state.theme]);


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
            toggleTheme,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;