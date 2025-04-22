import { FETCH_AIRPORTS_SUCCESS, FETCH_COUNTRIES_SUCCESS, IAirport, ICountry } from "../actions/countryAirport";

//state: ICountry[] = []: The initial state is an empty array of countries.
export const countriesReducer = (state: ICountry[] = [], action: any) => {
    switch (action.type) {
        case FETCH_COUNTRIES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export const airportsReducer = (state: IAirport[] = [], action: any) => {
    switch (action.type) {
        case FETCH_AIRPORTS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

