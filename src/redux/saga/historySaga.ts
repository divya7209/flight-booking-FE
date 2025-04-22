import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_BOOKING_HISTORY_FAILURE, FETCH_BOOKING_HISTORY_REQUEST, FETCH_BOOKING_HISTORY_SUCCESS } from '../actions/historyAction';
import { IBookingData } from '../actions/bookingAction';
import CustomApi from '../../core/CustomApi';
import { toast } from 'react-toastify';

const fetchBookingHistoryApi = (employeeId: string) => CustomApi(`/bookings/${employeeId}`)

export function* fetchBookingHistory(action: any) {

    try {
        const bookings: IBookingData = yield call(fetchBookingHistoryApi, action.payload);
        yield put({ type: FETCH_BOOKING_HISTORY_SUCCESS, payload: bookings });
    } catch (error: any) {
        const err = error.response.data.message || error.message
        toast.error(err)
        yield put({ type: FETCH_BOOKING_HISTORY_FAILURE, payload: err });
    }
}

export function* watchFetchBookingHistory() {
    yield takeLatest(FETCH_BOOKING_HISTORY_REQUEST, fetchBookingHistory);
}
