import { CREATE_BOOKING_FAILURE, CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS, IBooking } from "../../redux/actions/bookingAction";
import bookingReducer from "../../redux/reducers/bookingReducer";

describe('Given Booking Reducer', () => {
    const initialState = {
        booking: null,
        isLoading: false,
        error: null
    };
    const state = initialState;
    const bookingData: IBooking = {
        _id: 'booking123',
        employeeId: '123',
        sourceCountry: 'CountryA',
        sourceAirport: {
            code: 'SAC',
            name: 'Source Airport'
        },
        destinationCountry: 'CountryB',
        destinationAirport: {
            code: 'DAC',
            name: 'Destination Airport'
        },
        date: new Date(),
        visaDetails: {
            issueDate: new Date(),
            expiryDate: new Date(),
            visaNo: 'V123456',
            issuePlace: 'PlaceA'
        },
        passportDetails: {
            issueDate: new Date(),
            passportNo: 'P123456',
            issuePlace: 'PlaceB'
        },
        status: 'pending',
        createdAt: new Date()
    };
    const error = "Something went wrong";

    describe('should handle the CREATE_BOOKING_REQUEST', () => {
        it('SUCCESSFULLY CREATED', () => {
            expect(bookingReducer(state, { type: CREATE_BOOKING_REQUEST })).toEqual({ ...state, isLoading: true, error: null });
        });
    });

    describe('should handle the CREATE_BOOKING_SUCCESS', () => {
        it('SUCCESSFULLY CREATED', () => {
            expect(bookingReducer(state, { type: CREATE_BOOKING_SUCCESS, payload: bookingData })).toEqual({
                ...state,
                isLoading: false,
                booking: bookingData,
                error: null
            });
        });
    });

    describe('should handle the CREATE_BOOKING_FAILURE', () => {
        it('SUCCESSFULLY CREATED', () => {
            expect(bookingReducer(state, { type: CREATE_BOOKING_FAILURE, payload: error })).toEqual({ ...state, isLoading: false, error });
        });
    });
});