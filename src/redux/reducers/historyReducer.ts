import { FETCH_BOOKING_HISTORY_REQUEST, FETCH_BOOKING_HISTORY_SUCCESS, FETCH_BOOKING_HISTORY_FAILURE } from '../actions/historyAction';

interface BookingHistoryState {
    bookings: any[];
    isLoading: boolean;
    error: string | null;
}

const initialState: BookingHistoryState = {
    bookings: [],
    isLoading: false,
    error: null
};

const bookingHistoryReducer = (state = initialState, action: any): BookingHistoryState => {
    switch (action.type) {
        case FETCH_BOOKING_HISTORY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_BOOKING_HISTORY_SUCCESS:
            return {
                ...state,
                bookings: action.payload,
                isLoading: false,
                error: null
            };
        case FETCH_BOOKING_HISTORY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default bookingHistoryReducer;