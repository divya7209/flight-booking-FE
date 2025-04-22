import { FETCH_AIRPORTS_FAILURE, FETCH_AIRPORTS_REQUEST, FETCH_AIRPORTS_SUCCESS, FETCH_COUNTRIES_FAILURE, FETCH_COUNTRIES_REQUEST, FETCH_COUNTRIES_SUCCESS, fetchAirportsFailure, fetchAirportsRequest, fetchAirportsSuccess, fetchCountriesFailure, fetchCountriesRequest, fetchCountriesSuccess, IAirport, ICountry } from "../../redux/actions/countryAirport";


describe('Given Country and Airport Actions', () => {
    describe('when calling country action creators', () => {
        it('should create fetchCountriesRequest', () => {
            const result = fetchCountriesRequest();
            expect(result).toEqual({
                type: FETCH_COUNTRIES_REQUEST
            });
        });

        it('should create fetchCountriesSuccess', () => {
            const countries: ICountry[] = [
                { country: 'CountryA', airports: [{ name: 'AirportA', code: 'AA' }] },
                { country: 'CountryB', airports: [{ name: 'AirportB', code: 'BB' }] }
            ];
            const result = fetchCountriesSuccess(countries);
            expect(result).toEqual({
                type: FETCH_COUNTRIES_SUCCESS,
                payload: countries
            });
        });

        it('should create fetchCountriesFailure', () => {
            const error = 'Error message';
            const result = fetchCountriesFailure(error);
            expect(result).toEqual({
                type: FETCH_COUNTRIES_FAILURE,
                payload: error
            });
        });
    });

    describe('when calling airport action creators', () => {
        it('should create fetchAirportsRequest', () => {
            const country = 'CountryA';
            const result = fetchAirportsRequest(country);
            expect(result).toEqual({
                type: FETCH_AIRPORTS_REQUEST,
                payload: country
            });
        });

        it('should create fetchAirportsSuccess', () => {
            const airports: IAirport[] = [
                { name: 'AirportA', code: 'AA' },
                { name: 'AirportB', code: 'BB' }
            ];
            const result = fetchAirportsSuccess(airports);
            expect(result).toEqual({
                type: FETCH_AIRPORTS_SUCCESS,
                payload: airports
            });
        });

        it('should create fetchAirportsFailure', () => {
            const error = 'Error message';
            const result = fetchAirportsFailure(error);
            expect(result).toEqual({
                type: FETCH_AIRPORTS_FAILURE,
                payload: error
            });
        });
    });
});