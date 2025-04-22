import { AnyAction } from 'redux';

interface BookingState {
    bookings: any[];
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    loading: false,
    error: null,
};

const statusReducer = (state = initialState, action: AnyAction): BookingState => {
    switch (action.type) {
        case 'FETCH_MANAGER_BOOKINGS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_MANAGER_BOOKINGS_SUCCESS':
            return {
                ...state,
                bookings: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_MANAGER_BOOKINGS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'APPROVE_BOOKING_REQUEST':
        case 'REJECT_BOOKING_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'APPROVE_BOOKING_SUCCESS':
        case 'REJECT_BOOKING_SUCCESS':
            return {
                ...state,
                bookings: state.bookings.map((booking) =>
                    booking._id === action.payload._id ? action.payload : booking
                ),
                loading: false,
                error: null,
            };
        case 'APPROVE_BOOKING_FAILURE':
        case 'REJECT_BOOKING_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default statusReducer;