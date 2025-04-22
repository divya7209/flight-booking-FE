import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigate } from 'react-router';
import BookingStatusList from '../../components/BookingStatusList';
import { fetchManagerBookingsRequest, approveBookingRequest, rejectBookingRequest } from '../../redux/actions/statusAction';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

jest.mock('../../redux/actions/statusAction', () => ({
    fetchManagerBookingsRequest: jest.fn(),
    approveBookingRequest: jest.fn(),
    rejectBookingRequest: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
    loginUser: {
        data: {
            user: { _id: '123' },
            role: 'manager',
        },
    },
    bookingStatus: {
        bookings: [
            {
                _id: '1',
                status: 'pending',
                sourceCountry: 'Country A',
                sourceAirport: { name: 'Airport A', code: 'AAA' },
                destinationCountry: 'Country B',
                destinationAirport: { name: 'Airport B', code: 'BBB' },
                date: '2023-03-06T00:00:00Z',
                passportDetails: {
                    issueDate: '2020-01-01T00:00:00Z',
                    passportNo: 'A1234567',
                    issuePlace: 'Place A',
                },
            },
        ],
        loading: false,
        error: null,
    },
});

let navigate: jest.Mock;
let mockDispatch: jest.Mock;
beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
});

test('renders BookingStatusList', () => {
    render(
        <Provider store={store}>
            <BookingStatusList />
        </Provider>
    );

    expect(screen.getByText('Booking S')).toBeInTheDocument();
});

test('dispatches fetchManagerBookingsRequest on mount', () => {
    render(
        <Provider store={store}>
            <BookingStatusList />
        </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(fetchManagerBookingsRequest('123'));
});

test('handles approve booking', () => {
    render(
        <Provider store={store}>
            <BookingStatusList />
        </Provider>
    );

    const approveButton = screen.getByText('Pending');
    window.confirm = jest.fn(() => true); // Mock window.confirm to return true

    fireEvent.click(approveButton);

    expect(mockDispatch).toHaveBeenCalledWith(approveBookingRequest('1'));
});

test('handles reject booking', () => {
    render(
        <Provider store={store}>
            <BookingStatusList />
        </Provider>
    );

    const approveButton = screen.getByText('Pending');
    window.confirm = jest.fn(() => false); // Mock window.confirm to return false

    fireEvent.click(approveButton);

    expect(mockDispatch).toHaveBeenCalledWith(rejectBookingRequest('1'));
});

test('displays loading state', () => {
    const loadingStore = mockStore({
        loginUser: {
            data: {
                user: { _id: '123' },
                role: 'manager',
            },
        },
        bookingStatus: {
            bookings: [],
            loading: true,
            error: null,
        },
    });

    render(
        <Provider store={loadingStore}>
            <BookingStatusList />
        </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('displays error state', () => {
    const errorStore = mockStore({
        loginUser: {
            data: {
                user: { _id: '123' },
                role: 'manager',
            },
        },
        bookingStatus: {
            bookings: [],
            loading: false,
            error: 'Error fetching bookings',
        },
    });

    render(
        <Provider store={errorStore}>
            <BookingStatusList />
        </Provider>
    );

    expect(screen.getByText('Error fetching bookings')).toBeInTheDocument();
});