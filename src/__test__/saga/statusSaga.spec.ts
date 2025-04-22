import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { approveBooking, fetchManagerBookings, rejectBooking, watchBookingActions } from '../../redux/saga/statusSaga';

describe('watchBookingActions', () => {
    const genObject = watchBookingActions();
    it('should wait for every APPROVE_BOOKING_REQUEST action and call approveBooking', () => {
        expect(genObject.next().value).toEqual(takeLatest('APPROVE_BOOKING_REQUEST', approveBooking));
    });

    it('should wait for every REJECT_BOOKING_REQUEST action and call rejectBooking', () => {
        expect(genObject.next().value).toEqual(takeLatest('REJECT_BOOKING_REQUEST', rejectBooking));
    });

    it('should wait for every FETCH_MANAGER_BOOKINGS_REQUEST action and call fetchManagerBookings', () => {
        expect(genObject.next().value).toEqual(takeLatest('FETCH_MANAGER_BOOKINGS_REQUEST', fetchManagerBookings));
    });
});

describe('fetchManagerBookings', () => {
    const mockPayload = 'manager123';
    const action = {
        type: 'FETCH_MANAGER_BOOKINGS_REQUEST',
        payload: mockPayload,
    };
    const response = { data: [{ id: 'booking1' }, { id: 'booking2' }] };
    const error = new Error('Error fetching manager bookings');

    it('should handle fetching manager bookings success', () => {
        const genObject = fetchManagerBookings(action);
        expect(genObject.next().value).toEqual(call(axios.get, `http://localhost:8080/api/v1/bookings/manager/${mockPayload}`));
        expect(genObject.next(response).value).toEqual(put({ type: 'FETCH_MANAGER_BOOKINGS_SUCCESS', payload: response.data }));
        expect(genObject.next().done).toBe(true);
    });

    it('should handle fetching manager bookings failure', () => {
        const genObject = fetchManagerBookings(action);
        expect(genObject.next().value).toEqual(call(axios.get, `http://localhost:8080/api/v1/bookings/manager/${mockPayload}`));
        expect(genObject.throw(error).value).toEqual(put({ type: 'FETCH_MANAGER_BOOKINGS_FAILURE', payload: error.message }));
        expect(genObject.next().done).toBe(true);
    });
});

describe('approveBooking', () => {
    const mockPayload = 'booking123';
    const action = {
        type: 'APPROVE_BOOKING_REQUEST',
        payload: mockPayload,
    };
    const response = { data: { id: 'booking123', status: 'approved' } };
    const error = new Error('Error approving booking');

    it('should handle approving booking success', () => {
        const genObject = approveBooking(action);
        expect(genObject.next().value).toEqual(call(axios.patch, `http://localhost:8080/api/v1/bookings/approve/${mockPayload}`, { status: 'approved' }));
        expect(genObject.next(response).value).toEqual(put({ type: 'APPROVE_BOOKING_SUCCESS', payload: response.data }));
        expect(genObject.next().done).toBe(true);
    });

    it('should handle approving booking failure', () => {
        const genObject = approveBooking(action);
        expect(genObject.next().value).toEqual(call(axios.patch, `http://localhost:8080/api/v1/bookings/approve/${mockPayload}`, { status: 'approved' }));
        expect(genObject.throw(error).value).toEqual(put({ type: 'APPROVE_BOOKING_FAILURE', payload: error.message }));
        expect(genObject.next().done).toBe(true);
    });
});

describe('rejectBooking', () => {
    const mockPayload = 'booking123';
    const action = {
        type: 'REJECT_BOOKING_REQUEST',
        payload: mockPayload,
    };
    const response = { data: { id: 'booking123', status: 'rejected' } };
    const error = new Error('Error rejecting booking');

    it('should handle rejecting booking success', () => {
        const genObject = rejectBooking(action);
        expect(genObject.next().value).toEqual(call(axios.patch, `http://localhost:8080/api/v1/api/bookings/reject/${mockPayload}`, { status: 'rejected' }));
        expect(genObject.next(response).value).toEqual(put({ type: 'REJECT_BOOKING_SUCCESS', payload: response.data }));
        expect(genObject.next().done).toBe(true);
    });

    it('should handle rejecting booking failure', () => {
        const genObject = rejectBooking(action);
        expect(genObject.next().value).toEqual(call(axios.patch, `http://localhost:8080/api/v1/api/bookings/reject/${mockPayload}`, { status: 'rejected' }));
        expect(genObject.throw(error).value).toEqual(put({ type: 'REJECT_BOOKING_FAILURE', payload: error.message }));
        expect(genObject.next().done).toBe(true);
    });
});