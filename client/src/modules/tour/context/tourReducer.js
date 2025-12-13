export const initialState = {
    originQuery: "",
    destinationQuery: "",
    suggestedOrigins: [],
    suggestedOriginsList: true,
    suggestedDestinations: [],
    suggestedDestinationsList: true,
    startDate: null,
    endDate: null,
    Gender: "",
    genderDisplay: "",
    suggestedGendersList: false,
}


export const tourReducer = (state, action) => {
    switch (action.type) {
        case "SET_ORIGIN_QUERY":
            return {
                ...state, originQuery: action.payload,
            }
        case "SET_DESTINATION_QUERY":
            return {
                ...state, destinationQuery: action.payload,
            }
        case "SET_SUGGESTED_ORIGINS":
            return {
                ...state, suggestedOrigins: action.payload,
            }
        case "SET_SUGGESTED_DESTINATIONS":
            return {
                ...state, suggestedDestinations: action.payload,
            }
        case "OPEN_SUGGESTED_ORIGINS":
            return {
                ...state, suggestedOriginsList: true,
            }
        case "CLOSE_SUGGESTED_ORIGINS":
            return {
                ...state, suggestedOriginsList: false,
            }
        case "OPEN_SUGGESTED_DESTINATIONS":
            return {
                ...state, suggestedDestinationsList: true,
            }
        case "CLOSE_SUGGESTED_DESTINATIONS":
            return {
                ...state, suggestedDestinationsList: false,
            }
        case "SET_DATE":
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            }
        case "RESET_SEARCH":
            return {
                ...state,
                originQuery: "",
                destinationQuery: "",
                suggestedOrigins: [],
                suggestedOriginsList: true,
                suggestedDestinations: [],
                suggestedDestinationsList: true,
                startDate: null,
                endDate: null,
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
        case "SET_BIRTHDATE_VALUE":
            return {
                ...state, birthDateValue: action.payload,
            }
        default:
            return state;
    }
}