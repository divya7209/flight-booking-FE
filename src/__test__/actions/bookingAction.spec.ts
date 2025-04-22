import { CREATE_BOOKING_FAILURE, CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS, createBookingFailure, createBookingRequest, createBookingSuccess, IBooking, IBookingData } from '../../redux/actions/bookingAction';


describe('Given Booking Action', () => {
    const bookingData: IBookingData = {
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
        status: 'pending'
    };

    describe('when calling booking action creator', () => {
        it('should create createBookingRequest', () => {
            const result = createBookingRequest(bookingData);
            expect(result).toEqual({
                type: CREATE_BOOKING_REQUEST,
                payload: bookingData
            });
        });

        it('should create createBookingSuccess', () => {
            const booking: IBooking = {
                ...bookingData,
                _id: 'booking123',
                createdAt: new Date()
            };
            const result = createBookingSuccess(booking);
            expect(result).toEqual({
                type: CREATE_BOOKING_SUCCESS,
                payload: booking
            });
        });

        it('should create createBookingFailure', () => {
            const error = 'Error message';
            const result = createBookingFailure(error);
            expect(result).toEqual({
                type: CREATE_BOOKING_FAILURE,
                payload: error
            });
        });
    });
});