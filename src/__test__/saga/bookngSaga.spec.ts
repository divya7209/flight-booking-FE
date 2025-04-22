import { call, put, takeLatest } from 'redux-saga/effects';
import CustomApi from '../../core/CustomApi';
import { bookingWatcherSaga, bookingWorkerSaga } from '../../redux/saga/bookingSaga';
import { CREATE_BOOKING_FAILURE, CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS, IBooking, IBookingData } from '../../redux/actions/bookingAction';


const fetchBookingApi = (bookingData: IBookingData) => CustomApi('/bookings/create', 'POST', bookingData);

describe('bookingWatcherSaga', () => {
    const genObject = bookingWatcherSaga();
    it('should wait for every CREATE_BOOKING_REQUEST action and call bookingWorkerSaga', () => {
        expect(genObject.next().value).toEqual(takeLatest(CREATE_BOOKING_REQUEST, bookingWorkerSaga));
    });
});

describe('bookingWorkerSaga', () => {
    const mockPayload: IBookingData = {
        employeeId: '123',
        sourceCountry: 'CountryA',
        sourceAirport: { code: 'SAC', name: 'Source Airport' },
        destinationCountry: 'CountryB',
        destinationAirport: { code: 'DAC', name: 'Destination Airport' },
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
    const action = {
        type: CREATE_BOOKING_REQUEST,
        payload: mockPayload,
    };
    const booking: IBooking = {
        ...mockPayload,
        _id: 'booking123',
        createdAt: new Date()
    };
    const error = new Error('Error creating booking');

    it('should handle booking creation success', () => {
        const genObject = bookingWorkerSaga(action);
        expect(genObject.next().value).toEqual(call(fetchBookingApi, mockPayload));
        expect(genObject.next(booking).value).toEqual(put({ type: CREATE_BOOKING_SUCCESS, payload: booking }));
        expect(genObject.next().done).toBe(true);
    });

    it('should handle booking creation failure', () => {
        const genObject = bookingWorkerSaga(action);
        expect(genObject.next().value).toEqual(call(fetchBookingApi, mockPayload));
        expect(genObject.throw(error).value).toEqual(put({ type: CREATE_BOOKING_FAILURE, payload: error.message }));
        expect(genObject.next().done).toBe(true);
    });
});