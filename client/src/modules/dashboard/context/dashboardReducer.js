export const initialState = {
    active: "profile",
    showEmailForm: false,
    showUserForm: false,
    showBankForm: false,
    Gender: "",
    genderDisplay: "",
    suggestedGendersList: false,
}

export const dashboardReducer = (state, action) => {
    switch (action.type) {
        case "SET_ACTIVE":
            return {
                ...state, active: action.payload
            }
        case "OPEN_EMAIL_FORM":
            return {
                ...state, showEmailForm: true,
            }
        case "CLOSE_EMAIL_FORM":
            return {
                ...state, showEmailForm: false,
            }
        case "OPEN_USER_FORM":
            return {
                ...state, showUserForm: true
            }
        case "CLOSE_USER_FORM":
            return {
                ...state, showUserForm: false
            }
        case "OPEN_BANK_FORM":
            return {
                ...state, showBankForm: true
            }
        case "CLOSE_BANK_FORM":
            return {
                ...state, showBankForm: false
            }
        case "SET_GENDER":
            return {
                ...state, Gender: action.payload,
            }
        case "SET_GENDER_DISPLAY":
            return {
                ...state, genderDisplay: action.payload,
            }
        case "RESET_GENDER_DISPLAY":
            return {
                ...state, genderDisplay: "",
            }
        case "OPEN_SUGGESTED_GENDER":
            return {
                ...state, suggestedGendersList: true,
            }
        case "CLOSE_SUGGESTED_GENDER":
            return {
                ...state, suggestedGendersList: false,
            }
        default:
            return state;
    }
}