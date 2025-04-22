import { call, put, takeLatest } from "@redux-saga/core/effects";

import CustomApi from "../../core/CustomApi";
import { IBooking, IBookingData } from "../../interfaces/booking";
import { CREATE_BOOKING_FAILURE, CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS } from "../../constants/booking";

const fetchBookingApi = (bookingData: IBookingData) => CustomApi('/bookings/create', 'POST', bookingData)

export function* bookingWorkerSaga(action: any) {
    try {
        const booking: IBooking = yield call(fetchBookingApi, action.payload);
        yield put({ type: CREATE_BOOKING_SUCCESS, payload: booking });
    } catch (error: any) {
        yield put({ type: CREATE_BOOKING_FAILURE, payload: error.message });
    }
}

// booking watcher saga
export function* bookingWatcherSaga() {
    yield takeLatest(CREATE_BOOKING_REQUEST, bookingWorkerSaga)
}