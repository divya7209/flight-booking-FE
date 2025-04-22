export const FETCH_BOOKING_HISTORY_REQUEST = 'FETCH_BOOKING_HISTORY_REQUEST';
export const FETCH_BOOKING_HISTORY_SUCCESS = 'FETCH_BOOKING_HISTORY_SUCCESS';
export const FETCH_BOOKING_HISTORY_FAILURE = 'FETCH_BOOKING_HISTORY_FAILURE';

export const fetchBookingHistoryRequest = (employeeId: string) => ({ type: FETCH_BOOKING_HISTORY_REQUEST, payload: employeeId });
export const fetchBookingHistorySuccess = (bookings: any[]) => ({ type: FETCH_BOOKING_HISTORY_SUCCESS, payload: bookings });
export const fetchBookingHistoryFailure = (error: any) => ({ type: FETCH_BOOKING_HISTORY_FAILURE, payload: error });