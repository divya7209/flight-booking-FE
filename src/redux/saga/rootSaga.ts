import { all } from "@redux-saga/core/effects";

import userSaga from "./user";
import { bookingWatcherSaga } from "./bookingSaga";
import { countryAirportWatcherSaga } from "./countryAirportSaga";
import { watchFetchBookingHistory } from "./historySaga";
import { watchBookingActions } from "./statusSaga";

export default function* rootSaga() {
  yield all([userSaga(), watchBookingActions(), bookingWatcherSaga(), countryAirportWatcherSaga(), bookingWatcherSaga(), watchFetchBookingHistory()]);
}
