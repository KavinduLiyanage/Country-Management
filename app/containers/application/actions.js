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
} from '../../constants/action_types/application';


const getCountryDistance = data => ({
    type: GET_COUNTRIES_DISTANCE,
    data,
});

const getCountryDistanceSuccess = response => ({
    type: GET_COUNTRIES_DISTANCE_SUCCESS,
    response,
});

const getCountryDistanceFailed = error => ({
    type: GET_COUNTRIES_DISTANCE_FAILED,
    error,
});

const getClosestCountry = data => ({
    type: GET_CLOSEST_COUNTRY,
    data,
});

const getClosestCountrySuccess = response => ({
    type: GET_CLOSEST_COUNTRY_SUCCESS,
    response,
});

const getClosestCountryFailed = error => ({
    type: GET_CLOSEST_COUNTRY_FAILED,
    error,
});

const getTimezoneCountries = data => ({
    type: GET_TIMEZONE_COUNTRIES,
    data,
});

const getTimezoneCountriesSuccess = response => ({
    type: GET_TIMEZONE_COUNTRIES_SUCCESS,
    response,
});

const getTimezoneCountriesFailed = error => ({
    type: GET_TIMEZONE_COUNTRIES_FAILED,
    error,
});

const getSearchCountries = data => ({
    type: GET_SEARCH_COUNTRIES,
    data,
});

const getSearchCountriesSuccess = response => ({
    type: GET_SEARCH_COUNTRIES_SUCCESS,
    response,
});

const getSearchCountriesFailed = error => ({
    type: GET_SEARCH_COUNTRIES_FAILED,
    error,
});

const clearCountryData = response => ({
    type: CLEAR_COUNTRY_DATA,
    response,
});

export {
    getCountryDistance,
    getCountryDistanceSuccess,
    getCountryDistanceFailed,
    getClosestCountry,
    getClosestCountrySuccess,
    getClosestCountryFailed,
    getTimezoneCountries,
    getTimezoneCountriesFailed,
    getTimezoneCountriesSuccess,
    clearCountryData,
    getSearchCountries,
    getSearchCountriesFailed,
    getSearchCountriesSuccess,
};
