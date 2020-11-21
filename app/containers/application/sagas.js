import { takeEvery, put, call } from 'redux-saga/effects';
import {
    GET_COUNTRIES_DISTANCE,
    GET_CLOSEST_COUNTRY,
    GET_TIMEZONE_COUNTRIES,
    GET_SEARCH_COUNTRIES,
} from '../../constants/action_types/application';
import {
    getCountryDistanceSuccess,
    getCountryDistanceFailed,
    getClosestCountrySuccess,
    getClosestCountryFailed,
    getTimezoneCountriesSuccess,
    getTimezoneCountriesFailed,
    getSearchCountriesSuccess,
    getSearchCountriesFailed,
} from './actions';
import httpRequests from '../../helpers/httpRequests';
import util from '../../helpers/util';


export function* getCountryDistance(data) {
    try {
        const result = yield call(httpRequests.getCountriesData);
        if (result.status === 200) {
            const distance = util.getDistanceOfCountries(result.data, data.data);
            if (distance) {
                yield put(getCountryDistanceSuccess(distance));
            } else {
                yield put(getCountryDistanceFailed('Entered country codes have not matched'));
            }
        } else {
            yield put(getCountryDistanceFailed('Unable to fetch the country'));
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error->getCountryDistance ', error);
        yield put(getCountryDistanceFailed(error));
    }
}


export function* getClosestCountry(data) {
    try {
        const result = yield call(httpRequests.getCountriesData);
        if (result.status === 200) {
            const closestCountry = util.getClosestCountry(result.data, data.data.countryName);

            if (closestCountry) {
                yield put(getClosestCountrySuccess(closestCountry));
            } else {
                yield put(getClosestCountryFailed('No matching country available'));
            }
        } else {
            yield put(getClosestCountryFailed('Unable to fetch the country'));
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error->getClosestCountry ', error);
        yield put(getClosestCountryFailed(error));
    }
}
export function* getTimezoneCountries(data) {
    try {
        const result = yield call(httpRequests.getCountriesData);
        if (result.status === 200) {
            const timezoneCountries = util.getTimezoneCountries(result.data, data.data);
            yield put(getTimezoneCountriesSuccess(timezoneCountries));
        } else {
            yield put(getTimezoneCountriesFailed('Unable to fetch the country'));
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error->getTimezoneCountries ', error);
        yield put(getTimezoneCountriesFailed(error));
    }
}

export function* getSearchCountries(data) {
    try {
        const result = yield call(httpRequests.getCountriesData);
        if (result.status === 200) {
            const searchCountries = util.getTimezoneCountries(result.data, data.data);

            if (searchCountries.length===0) {
                yield put(getClosestCountryFailed('No country available'));
            
            } else {
                yield put(getSearchCountriesSuccess(searchCountries));
            }
            
        } else {
            yield put(getSearchCountriesFailed('Unable to fetch the country'));
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error->getSearchCountries ', error);
        yield put(getSearchCountriesFailed(error));
    }
}

export default function* countryManagementSagas() {
    yield* [
        takeEvery(GET_COUNTRIES_DISTANCE, getCountryDistance),
        takeEvery(GET_CLOSEST_COUNTRY, getClosestCountry),
        takeEvery(GET_TIMEZONE_COUNTRIES, getTimezoneCountries),
        takeEvery(GET_SEARCH_COUNTRIES, getSearchCountries),
    ];
}
