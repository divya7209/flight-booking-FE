import { call, put, takeLatest } from 'redux-saga/effects';
import CustomApi from '../../core/CustomApi';
import { airportWorkerSaga, countryAirportWatcherSaga, countryWorkerSaga } from '../../redux/saga/countryAirportSaga';
import { FETCH_AIRPORTS_FAILURE, FETCH_AIRPORTS_REQUEST, FETCH_AIRPORTS_SUCCESS, FETCH_COUNTRIES_FAILURE, FETCH_COUNTRIES_REQUEST, FETCH_COUNTRIES_SUCCESS, IAirport, ICountry } from '../../redux/actions/countryAirport';

const fetchCountriesApi = () => CustomApi('/countries');
const fetchAirportsApi = (country: string) => CustomApi(`/airports?country=${country}`);

describe('countryAirportWatcherSaga', () => {
    const genObject = countryAirportWatcherSaga();
    it('should wait for every FETCH_COUNTRIES_REQUEST action and call countryWorkerSaga', () => {
        expect(genObject.next().value).toEqual(takeLatest(FETCH_COUNTRIES_REQUEST, countryWorkerSaga));
    });

    it('should wait for every FETCH_AIRPORTS_REQUEST action and call airportWorkerSaga', () => {
        expect(genObject.next().value).toEqual(takeLatest(FETCH_AIRPORTS_REQUEST, airportWorkerSaga));
    });
});

describe('countryWorkerSaga', () => {
    const countries: ICountry = {
        country: 'CountryA',
        airports: [{ name: 'AirportA', code: 'AA' }]
    };
    const error = new Error('Error fetching countries');

    it('should handle fetching countries success', () => {
        const genObject = countryWorkerSaga();
        expect(genObject.next().value).toEqual(call(fetchCountriesApi));
        expect(genObject.next(countries).value).toEqual(put({ type: FETCH_COUNTRIES_SUCCESS, payload: countries }));
        expect(genObject.next().done).toBe(true);
    });

    it('should handle fetching countries failure', () => {
        const genObject = countryWorkerSaga();
        expect(genObject.next().value).toEqual(call(fetchCountriesApi));
        expect(genObject.throw(error).value).toEqual(put({ type: FETCH_COUNTRIES_FAILURE, payload: error.message }));
        expect(genObject.next().done).toBe(true);
    });
});

describe('airportWorkerSaga', () => {
    const mockPayload = 'CountryA';
    const action = {
        type: FETCH_AIRPORTS_REQUEST,
        payload: mockPayload,
    };
    const airports: IAirport = {
        name: 'AirportA',
        code: 'AA'
    };
    const error = new Error('Error fetching airports');

    it('should handle fetching airports success', () => {
        const genObject = airportWorkerSaga(action);
        expect(genObject.next().value).toEqual(call(fetchAirportsApi, mockPayload));
        expect(genObject.next(airports).value).toEqual(put({ type: FETCH_AIRPORTS_SUCCESS, payload: airports }));
        expect(genObject.next().done).toBe(true);
    });

    it('should handle fetching airports failure', () => {
        const genObject = airportWorkerSaga(action);
        expect(genObject.next().value).toEqual(call(fetchAirportsApi, mockPayload));
        expect(genObject.throw(error).value).toEqual(put({ type: FETCH_AIRPORTS_FAILURE, payload: error.message }));
        expect(genObject.next().done).toBe(true);
    });
});