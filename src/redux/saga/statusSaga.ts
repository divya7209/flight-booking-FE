import { call, put, takeLatest, CallEffect, PutEffect } from 'redux-saga/effects';
import axios from 'axios';

// Define the return type for the generator function
type ApproveBookingResponse = {
    type: string;
    payload: any;
};
type FetchManagerBookingsResponse = {
    type: string;
    payload: any;
};
export function* fetchManagerBookings(action: any): Generator<CallEffect | PutEffect<FetchManagerBookingsResponse>, void, any> {
    try {
        const response = yield call(axios.get, `http://localhost:8080/api/v1/bookings/manager/${action.payload}`);
        yield put({ type: 'FETCH_MANAGER_BOOKINGS_SUCCESS', payload: response.data });
    } catch (error: any) {
        yield put({ type: 'FETCH_MANAGER_BOOKINGS_FAILURE', payload: error.message });
    }
}

export function* approveBooking(action: any): Generator<CallEffect | PutEffect<ApproveBookingResponse>, void, any> {
    try {
        const response = yield call(axios.patch, `http://localhost:8080/api/v1/bookings/approve/${action.payload}`, { status: "approved" });
        yield put({ type: 'APPROVE_BOOKING_SUCCESS', payload: response.data });
    } catch (error: any) {
        yield put({ type: 'APPROVE_BOOKING_FAILURE', payload: error.message });
    }
}

export function* rejectBooking(action: any): Generator<CallEffect | PutEffect<ApproveBookingResponse>, void, any> {
    try {
        const response = yield call(axios.patch, `http://localhost:8080/api/v1/api/bookings/reject/${action.payload}`, { status: "rejected" });
        yield put({ type: 'REJECT_BOOKING_SUCCESS', payload: response.data });
    } catch (error: any) {
        yield put({ type: 'REJECT_BOOKING_FAILURE', payload: error.message });
    }
}

export function* watchBookingActions() {
    yield takeLatest('APPROVE_BOOKING_REQUEST', approveBooking);
    yield takeLatest('REJECT_BOOKING_REQUEST', rejectBooking);
    yield takeLatest('FETCH_MANAGER_BOOKINGS_REQUEST', fetchManagerBookings);

}