import { FETCH_BOOKING_HISTORY_FAILURE, FETCH_BOOKING_HISTORY_REQUEST, FETCH_BOOKING_HISTORY_SUCCESS } from "../../redux/actions/historyAction";
import bookingHistoryReducer from "../../redux/reducers/historyReducer";


describe('Given Booking History Reducer', () => {
    const initialState = {
        bookings: [],
        isLoading: false,
        error: null
    };
    const state = initialState;
    const bookings = [
        { id: 'booking1', details: 'details1' },
        { id: 'booking2', details: 'details2' }
    ];
    const error = "Something went wrong";

    describe('should handle the FETCH_BOOKING_HISTORY_REQUEST', () => {
        it('SUCCESSFULLY CREATED', () => {
            expect(bookingHistoryReducer(state, { type: FETCH_BOOKING_HISTORY_REQUEST })).toEqual({
                ...state,
                isLoading: true,
                error: null
            });
        });
    });

    describe('should handle the FETCH_BOOKING_HISTORY_SUCCESS', () => {
        it('SUCCESSFULLY CREATED', () => {
            expect(bookingHistoryReducer(state, { type: FETCH_BOOKING_HISTORY_SUCCESS, payload: bookings })).toEqual({
                ...state,
                bookings: bookings,
                isLoading: false,
                error: null
            });
        });
    });

    describe('should handle the FETCH_BOOKING_HISTORY_FAILURE', () => {
        it('SUCCESSFULLY CREATED', () => {
            expect(bookingHistoryReducer(state, { type: FETCH_BOOKING_HISTORY_FAILURE, payload: error })).toEqual({
                ...state,
                isLoading: false,
                error
            });
        });
    });
});