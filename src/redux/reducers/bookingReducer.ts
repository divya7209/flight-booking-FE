import { BookingState } from '../../interfaces/booking';
import { CREATE_BOOKING_FAILURE, CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS } from '../../constants/booking';

const initialState: BookingState = {
    booking: null,
    isLoading: false,
    error: null
};

const bookingReducer = (state = initialState, action: any): BookingState => {
    switch (action.type) {
        case CREATE_BOOKING_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                booking: action.payload,
                isLoading: false,
                error: null
            };
        case CREATE_BOOKING_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default bookingReducer;