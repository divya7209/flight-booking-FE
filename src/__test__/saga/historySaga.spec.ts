import { call, put, takeLatest } from 'redux-saga/effects';
import CustomApi from '../../core/CustomApi';
import { fetchBookingHistory, watchFetchBookingHistory } from '../../redux/saga/historySaga';
import { FETCH_BOOKING_HISTORY_FAILURE, FETCH_BOOKING_HISTORY_REQUEST, FETCH_BOOKING_HISTORY_SUCCESS } from '../../redux/actions/historyAction';
import { IBookingData } from '../../redux/actions/bookingAction';

const fetchBookingHistoryApi = (employeeId: string) => CustomApi(`/bookings/${employeeId}`);

describe('watchFetchBookingHistory', () => {
    const genObject = watchFetchBookingHistory();
    it('should wait for every FETCH_BOOKING_HISTORY_REQUEST action and call fetchBookingHistory', () => {
        expect(genObject.next().value).toEqual(takeLatest(FETCH_BOOKING_HISTORY_REQUEST, fetchBookingHistory));
    });
});

describe('fetchBookingHistory', () => {
    const mockPayload = 'employee123';
    const action = {
        type: FETCH_BOOKING_HISTORY_REQUEST,
        payload: mockPayload,
    };
    const bookings: IBookingData = {
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
    const error = new Error('Error fetching booking history');

    it('should handle fetching booking history success', () => {
        const genObject = fetchBookingHistory(action);
        expect(genObject.next().value).toEqual(call(fetchBookingHistoryApi, mockPayload));
        expect(genObject.next(bookings).value).toEqual(put({ type: FETCH_BOOKING_HISTORY_SUCCESS, payload: bookings }));
        expect(genObject.next().done).toBe(true);
    });

    it('should handle fetching booking history failure', () => {
        const genObject = fetchBookingHistory(action);
        expect(genObject.next().value).toEqual(call(fetchBookingHistoryApi, mockPayload));
        expect(genObject.throw(error).value).toEqual(put({ type: FETCH_BOOKING_HISTORY_FAILURE, payload: error.message }));
        expect(genObject.next().done).toBe(true);
    });
});