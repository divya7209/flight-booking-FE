import { combineReducers, Reducer } from "redux";

import loginUserReducer from "./userLoginReducer";
import { airportsReducer, countriesReducer } from "./countryAirport";
import bookingReducer from "./bookingReducer";
import bookingHistoryReducer from "./historyReducer";
import statusReducer from "./statusReducer";

const rootReducer: Reducer = combineReducers({
  loginUser: loginUserReducer, countries: countriesReducer,
  airports: airportsReducer,
  booking: bookingReducer,
  allBookings: bookingHistoryReducer,
  bookingStatus: statusReducer

});

// Define the RootState type based on the root reducer
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
