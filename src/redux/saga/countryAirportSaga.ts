import { call, put, takeLatest } from "@redux-saga/core/effects";
import { FETCH_AIRPORTS_FAILURE, FETCH_AIRPORTS_REQUEST, FETCH_AIRPORTS_SUCCESS, FETCH_COUNTRIES_FAILURE, FETCH_COUNTRIES_REQUEST, FETCH_COUNTRIES_SUCCESS, IAirport, ICountry } from "../actions/countryAirport";
import CustomApi from "../../core/CustomApi";
// API call to fetch countries
const fetchCountriesApi = () => CustomApi('/countries')

// API call to fetch airports for a specific country
const fetchAirportsApi = (country: string) => CustomApi(`/airports?country=${country}`);

// Worker saga: will be fired on FETCH_COUNTRIES_REQUEST actions
export function* countryWorkerSaga() {
    try {
        const countries: ICountry = yield call(fetchCountriesApi);
        console.log('countries', countries)
        yield put({ type: FETCH_COUNTRIES_SUCCESS, payload: countries });
    } catch (error: any) {
        yield put({ type: FETCH_COUNTRIES_FAILURE, payload: error.message });
    }
}

// Worker saga: will be fired on FETCH_AIRPORTS_REQUEST actions
export function* airportWorkerSaga(action: any) {
    try {
        const airports: IAirport = yield call(fetchAirportsApi, action.payload);
        yield put({ type: FETCH_AIRPORTS_SUCCESS, payload: airports });
    } catch (error: any) {
        yield put({ type: FETCH_AIRPORTS_FAILURE, payload: error.message });
    }
}

export function* countryAirportWatcherSaga() {
    yield takeLatest(FETCH_COUNTRIES_REQUEST, countryWorkerSaga)
    yield takeLatest(FETCH_AIRPORTS_REQUEST, airportWorkerSaga)
}