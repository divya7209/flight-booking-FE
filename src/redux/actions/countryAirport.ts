
export interface IAirport {
    name: string,
    code: string
}
export interface ICountry {
    country: string,
    airports: IAirport[]
}
// action for counties 
export const FETCH_COUNTRIES_REQUEST = 'FETCH_COUNTRIES_REQUEST';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE';
// action for counties 
export const FETCH_AIRPORTS_REQUEST = 'FETCH_AIRPORTS_REQUEST';
export const FETCH_AIRPORTS_SUCCESS = 'FETCH_AIRPORTS_SUCCESS';
export const FETCH_AIRPORTS_FAILURE = 'FETCH_AIRPORTS_FAILURE';
//methods for countries
export const fetchCountriesRequest = () => ({
    type: FETCH_COUNTRIES_REQUEST
})
export const fetchCountriesSuccess = (countries: ICountry[]) => ({
    type: FETCH_COUNTRIES_SUCCESS, payload: countries
})
export const fetchCountriesFailure = (error: string) => ({
    type: FETCH_COUNTRIES_FAILURE, payload: error
})

//action method for airports
//Initiates the request to fetch airports for a specific country.
export const fetchAirportsRequest = (country: string) => ({
    type: FETCH_AIRPORTS_REQUEST, payload: country
});
export const fetchAirportsSuccess = (airports: IAirport[]) => ({
    type: FETCH_AIRPORTS_SUCCESS, payload: airports
});
export const fetchAirportsFailure = (error: string) => ({
    type: FETCH_AIRPORTS_FAILURE, payload: error
});