import {
    GET_COUNTRIES_DISTANCE,
    GET_COUNTRIES_DISTANCE_SUCCESS,
    GET_COUNTRIES_DISTANCE_FAILED,
    GET_CLOSEST_COUNTRY,
    GET_CLOSEST_COUNTRY_SUCCESS,
    GET_CLOSEST_COUNTRY_FAILED,
    GET_TIMEZONE_COUNTRIES,
    GET_TIMEZONE_COUNTRIES_SUCCESS,
    GET_TIMEZONE_COUNTRIES_FAILED,
    CLEAR_COUNTRY_DATA,
    GET_SEARCH_COUNTRIES,
    GET_SEARCH_COUNTRIES_SUCCESS,
    GET_SEARCH_COUNTRIES_FAILED
} from '../constants/action_types/application';

const initialState = {
    selectCountryDistanceStatus: false,
    selectCountryDistanceResponse: null,
    selectCountryDistanceError: null,
    selectClosestCountryStatus: false,
    selectClosestCountryStatusResponse: null,
    selectClosestCountryStatusError: null,
    selectTimezoneCountriesStatus: false,
    selectTimezoneCountriesResponse: null,
    selectTimezoneCountriesError: null,
    selectSearchCountriesStatus: false,
    selectSearchCountriesResponse: null,
    selectSearchCountriesError: null,
};

export default function countryManagement(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES_DISTANCE:
            return { ...state, selectCountryDistanceStatus: false, selectCountryDistanceResponse: {}, selectCountryDistanceError: null };
        case GET_COUNTRIES_DISTANCE_SUCCESS:
            return { ...state, selectCountryDistanceStatus: true, selectCountryDistanceResponse: action.response, selectCountryDistanceError: null };
        case GET_COUNTRIES_DISTANCE_FAILED:
            return {
                ...state,
                selectCountryDistanceStatus: false,
                selectCountryDistanceResponse: {},
                selectCountryDistanceError: action.error,
            };
        case GET_CLOSEST_COUNTRY:
            return { ...state, selectClosestCountryStatus: false, selectClosestCountryStatusResponse: {}, selectClosestCountryStatusError: null };
        case GET_CLOSEST_COUNTRY_SUCCESS:
            return {
                ...state,
                selectClosestCountryStatus: true,
                selectClosestCountryStatusResponse: action.response,
                selectClosestCountryStatusError: null,
            };
        case GET_CLOSEST_COUNTRY_FAILED:
            return {
                ...state,
                selectClosestCountryStatus: false,
                selectClosestCountryStatusResponse: {},
                selectClosestCountryStatusError: action.error,
            };
        case GET_TIMEZONE_COUNTRIES:
            return { ...state, selectTimezoneCountriesStatus: false, selectTimezoneCountriesResponse: [], selectTimezoneCountriesError: null };
        case GET_TIMEZONE_COUNTRIES_SUCCESS:
            return {
                ...state,
                selectTimezoneCountriesStatus: true,
                selectTimezoneCountriesResponse: action.response,
                selectTimezoneCountriesError: null,
            };
        case GET_TIMEZONE_COUNTRIES_FAILED:
            return {
                ...state,
                selectTimezoneCountriesStatus: false,
                selectTimezoneCountriesResponse: [],
                selectTimezoneCountriesError: action.error,
            };

        case GET_SEARCH_COUNTRIES:
            return { ...state, selectSearchCountriesStatus: false, selectSearchCountriesResponse: [], selectSearchCountriesError: null };
        case GET_SEARCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                selectSearchCountriesStatus: true,
                selectSearchCountriesResponse: action.response,
                selectSearchCountriesError: null,
            };
        case GET_SEARCH_COUNTRIES_FAILED:
            return {
                ...state,
                selectSearchCountriesStatus: false,
                selectSearchCountriesResponse: [],
                selectSearchCountriesError: action.error,
            };
            
        case CLEAR_COUNTRY_DATA:
            return {
                ...state,
                selectCountryDistanceStatus: false,
                selectCountryDistanceResponse: null,
                selectCountryDistanceError: null,
                selectClosestCountryStatus: false,
                selectClosestCountryStatusResponse: null,
                selectClosestCountryStatusError: null,
                selectTimezoneCountriesStatus: false,
                selectTimezoneCountriesResponse: null,
                selectTimezoneCountriesError: null,
                selectSearchCountriesStatus: false,
                selectSearchCountriesResponse: null,
                selectSearchCountriesError: null,
            };
        default:
            return state;
    }
}
