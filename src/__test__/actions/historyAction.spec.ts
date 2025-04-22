import { FETCH_BOOKING_HISTORY_FAILURE, FETCH_BOOKING_HISTORY_REQUEST, FETCH_BOOKING_HISTORY_SUCCESS, fetchBookingHistoryFailure, fetchBookingHistoryRequest, fetchBookingHistorySuccess } from "../../redux/actions/historyAction";


describe('Given Booking History Actions', () => {
    describe('when calling booking history action creators', () => {
        it('should create fetchBookingHistoryRequest', () => {
            const employeeId = 'employee123';
            const result = fetchBookingHistoryRequest(employeeId);
            expect(result).toEqual({
                type: FETCH_BOOKING_HISTORY_REQUEST,
                payload: employeeId
            });
        });

        it('should create fetchBookingHistorySuccess', () => {
            const bookings = [
                { id: 'booking1', details: 'details1' },
                { id: 'booking2', details: 'details2' }
            ];
            const result = fetchBookingHistorySuccess(bookings);
            expect(result).toEqual({
                type: FETCH_BOOKING_HISTORY_SUCCESS,
                payload: bookings
            });
        });

        it('should create fetchBookingHistoryFailure', () => {
            const error = 'Error message';
            const result = fetchBookingHistoryFailure(error);
            expect(result).toEqual({
                type: FETCH_BOOKING_HISTORY_FAILURE,
                payload: error
            });
        });
    });
});