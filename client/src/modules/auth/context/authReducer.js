export const initialState = {
    authModal: false,
    step: 1,
    mobile: "",
    code: "",
    timeLeft: 120,
    dropDown: false,
    alertModal: false,
    theme: "light",
}



export const authReducer = (state, action) => {
    switch (action.type) {
        case "OPEN_AUTH_MODAL":
            return {
                ...state,
                authModal: true
            }
        case "CLOSE_AUTH_MODAL":
            return {
                ...state,
                authModal: false,
                step: 1,
            }
        case "SET_STEP":
            return {
                ...state,
                step: action.payload,
            }
        case "SET_MOBILE":
            return {
                ...state,
                mobile: action.payload,
            }
        case "SET_CODE":
            return {
                ...state,
                code: action.payload,
            }
        case "SET_TIMELEFT":
            return {
                ...state,
                timeLeft: action.payload,
            }
        case "TOGGLE_DROPDOWN":
            return {
                ...state,
                dropDown: !state.dropDown,
            }
        case "CLOSE_DROPDOWN":
            return {
                ...state,
                dropDown: false,
            }
        case "OPEN_ALERT_MODAL":
            return {
                ...state,
                alertModal: true,
            }
        case "CLOSE_ALERT_MODAL":
            return {
                ...state,
                alertModal: false,
            }
        case "TOGGLE_THEME":
            return {
                ...state, theme: state.theme === "light" ? "dark" : "light"
            }
        default:
            return state;
    }
}