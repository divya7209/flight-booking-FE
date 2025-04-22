import statusReducer from "../../redux/reducers/statusReducer";

describe('Given Status Reducer', () => {
    const initialState = {
        bookings: [],
        loading: false,
        error: null
    };
    const state = initialState;
    const bookings = [
        { _id: 'booking1', details: 'details1' },
        { _id: 'booking2', details: 'details2' }
    ];
    const updatedBooking = { _id: 'booking1', details: 'updated details' };
    const error = "Something went wrong";

    describe('should handle FETCH_MANAGER_BOOKINGS_REQUEST', () => {
        it('SUCCESSFULLY CREATED', () => {
            expect(statusReducer(state, { type: 'FETCH_MANAGER_BOOKINGS_REQUEST' })).toEqual({
                ...state,
                loading: true,
                error: null
            });
        });
    });

    describe('should handle FETCH_MANAGER_BOOKINGS_SUCCESS', () => {
        it('SUCCESSFULLY CREATED', () => {
            expect(statusReducer(state, { type: 'FETCH_MANAGER_BOOKINGS_SUCCESS', payload: bookings })).toEqual({
                ...state,
                bookings: bookings,
                loading: false,
                error: null
            });
        });
    });

    describe('should handle FETCH_MANAGER_BOOKINGS_FAILURE', () => {
        it('SUCCESSFULLY CREATED', () => {
            expect(statusReducer(state, { type: 'FETCH_MANAGER_BOOKINGS_FAILURE', payload: error })).toEqual({
                ...state,
                loading: false,
                error
            });
        });
    });

    describe('should handle APPROVE_BOOKING_REQUEST and REJECT_BOOKING_REQUEST', () => {
        it('APPROVE_BOOKING_REQUEST', () => {
            expect(statusReducer(state, { type: 'APPROVE_BOOKING_REQUEST' })).toEqual({
                ...state,
                loading: true,
                error: null
            });
        });

        it('REJECT_BOOKING_REQUEST', () => {
            expect(statusReducer(state, { type: 'REJECT_BOOKING_REQUEST' })).toEqual({
                ...state,
                loading: true,
                error: null
            });
        });
    });

    describe('should handle APPROVE_BOOKING_SUCCESS and REJECT_BOOKING_SUCCESS', () => {
        it('APPROVE_BOOKING_SUCCESS', () => {
            expect(statusReducer({ ...state, bookings }, { type: 'APPROVE_BOOKING_SUCCESS', payload: updatedBooking })).toEqual({
                ...state,
                bookings: bookings.map((booking) =>
                    booking._id === updatedBooking._id ? updatedBooking : booking
                ),
                loading: false,
                error: null
            });
        });

        it('REJECT_BOOKING_SUCCESS', () => {
            expect(statusReducer({ ...state, bookings }, { type: 'REJECT_BOOKING_SUCCESS', payload: updatedBooking })).toEqual({
                ...state,
                bookings: bookings.map((booking) =>
                    booking._id === updatedBooking._id ? updatedBooking : booking
                ),
                loading: false,
                error: null
            });
        });
    });

    describe('should handle APPROVE_BOOKING_FAILURE and REJECT_BOOKING_FAILURE', () => {
        it('APPROVE_BOOKING_FAILURE', () => {
            expect(statusReducer(state, { type: 'APPROVE_BOOKING_FAILURE', payload: error })).toEqual({
                ...state,
                loading: false,
                error
            });
        });

        it('REJECT_BOOKING_FAILURE', () => {
            expect(statusReducer(state, { type: 'REJECT_BOOKING_FAILURE', payload: error })).toEqual({
                ...state,
                loading: false,
                error
            });
        });
    });
});