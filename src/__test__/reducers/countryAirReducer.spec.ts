import { FETCH_AIRPORTS_SUCCESS, FETCH_COUNTRIES_SUCCESS, IAirport, ICountry } from "../../redux/actions/countryAirport";
import { airportsReducer, countriesReducer } from "../../redux/reducers/countryAirport";


describe('Given Country and Airport Reducers', () => {
    describe('countriesReducer', () => {
        it('should handle FETCH_COUNTRIES_SUCCESS', () => {
            const initialState: ICountry[] = [];
            const countries: ICountry[] = [
                { country: 'CountryA', airports: [{ name: 'AirportA', code: 'AA' }] },
                { country: 'CountryB', airports: [{ name: 'AirportB', code: 'BB' }] }
            ];
            const action = { type: FETCH_COUNTRIES_SUCCESS, payload: countries };
            const result = countriesReducer(initialState, action);
            expect(result).toEqual(countries);
        });

        it('should return the initial state for unknown action types', () => {
            const initialState: ICountry[] = [];
            const action = { type: 'UNKNOWN_ACTION' };
            const result = countriesReducer(initialState, action);
            expect(result).toEqual(initialState);
        });
    });

    describe('airportsReducer', () => {
        it('should handle FETCH_AIRPORTS_SUCCESS', () => {
            const initialState: IAirport[] = [];
            const airports: IAirport[] = [
                { name: 'AirportA', code: 'AA' },
                { name: 'AirportB', code: 'BB' }
            ];
            const action = { type: FETCH_AIRPORTS_SUCCESS, payload: airports };
            const result = airportsReducer(initialState, action);
            expect(result).toEqual(airports);
        });

        it('should return the initial state for unknown action types', () => {
            const initialState: IAirport[] = [];
            const action = { type: 'UNKNOWN_ACTION' };
            const result = airportsReducer(initialState, action);
            expect(result).toEqual(initialState);
        });
    });
});