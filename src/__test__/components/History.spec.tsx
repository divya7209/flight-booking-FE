import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BookingHistory from '../../components/BookingHistory';
import { fetchBookingHistoryRequest } from '../../redux/actions/historyAction';

jest.mock('../../redux/actions/historyAction', () => ({
    fetchBookingHistoryRequest: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
    loginUser: {
        data: {
            user: {
                _id: 'userId',
            },
        },
    },
    allBookings: {
        loading: false,
        error: null,
        bookings: {
            bookings: [
                {
                    _id: 'bookingId1',
                    sourceCountry: 'USA',
                    sourceAirport: { name: 'JFK', code: 'JFK' },
                    destinationCountry: 'UK',
                    destinationAirport: { name: 'Heathrow', code: 'LHR' },
                    date: '2025-03-14T00:00:00.000Z',
                    status: 'approved',
                    passportDetails: {
                        issueDate: '2025-02-23T00:00:00.000Z',
                        passportNo: '123456789',
                        issuePlace: 'New York',
                    },
                },
            ],
        },
    },
});

beforeEach(() => {
    store.clearActions();
});

test('renders BookingHistory', () => {
    render(
        <Provider store={store}>
            <BookingHistory />
        </Provider>
    );

    expect(screen.getByText(/Booking History/i)).toBeInTheDocument();
    expect(screen.getByText(/Booking ID: bookingId1/i)).toBeInTheDocument();
    expect(screen.getByText(/Source: USA - JFK \(JFK\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Destination: UK - Heathrow \(LHR\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Date: 3\/14\/2025/i)).toBeInTheDocument();
    expect(screen.getByText(/Passport Details:/i)).toBeInTheDocument();
    expect(screen.getByText(/Issue Date: 2\/23\/2025/i)).toBeInTheDocument();
    expect(screen.getByText(/Passport No: 123456789/i)).toBeInTheDocument();
    expect(screen.getByText(/Issue Place: New York/i)).toBeInTheDocument();
    expect(screen.getByText(/Approved/i)).toBeInTheDocument();
});

test('dispatches fetchBookingHistoryRequest on mount', () => {
    render(
        <Provider store={store}>
            <BookingHistory />
        </Provider>
    );

    expect(fetchBookingHistoryRequest).toHaveBeenCalledWith('userId');
});

test('shows loading state', () => {
    const loadingStore = mockStore({
        loginUser: {
            data: {
                user: {
                    _id: 'userId',
                },
            },
        },
        allBookings: {
            loading: true,
            error: null,
            bookings: null,
        },
    });

    render(
        <Provider store={loadingStore}>
            <BookingHistory />
        </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('shows error state', () => {
    const errorStore = mockStore({
        loginUser: {
            data: {
                user: {
                    _id: 'userId',
                },
            },
        },
        allBookings: {
            loading: false,
            error: 'Error fetching bookings',
            bookings: null,
        },
    });

    render(
        <Provider store={errorStore}>
            <BookingHistory />
        </Provider>
    );

    expect(screen.getByText(/Error fetching bookings/i)).toBeInTheDocument();
});
test('shows loading state', () => {
    const loadingStore = mockStore({
        loginUser: {
            data: {
                user: {
                    _id: 'userId',
                },
            },
        },
        allBookings: {
            loading: true,
            error: null,
            bookings: null,
        },
    });

    render(
        <Provider store={loadingStore}>
            <BookingHistory />
        </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});


// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import BookingHistory from '../../components/BookingHistory';
// import { fetchBookingHistoryRequest } from '../../redux/actions/historyAction';

// jest.mock('../../redux/actions/historyAction', () => ({
//     fetchBookingHistoryRequest: jest.fn(),
//     approveBookingRequest: jest.fn(),
//     rejectBookingRequest: jest.fn(),
// }));

// const mockStore = configureStore();
// const store = mockStore({
//     loginUser: {
//         data: {
//             user: {
//                 _id: 'userId',
//             },
//         },
//     },
//     allBookings: {
//         loading: false,
//         error: null,
//         bookings: {
//             bookings: [
//                 {
//                     _id: 'bookingId1',
//                     sourceCountry: 'USA',
//                     sourceAirport: { name: 'JFK', code: 'JFK' },
//                     destinationCountry: 'UK',
//                     destinationAirport: { name: 'Heathrow', code: 'LHR' },
//                     date: '2025-03-14T00:00:00.000Z',
//                     status: 'approved',
//                     passportDetails: {
//                         issueDate: '2025-02-23T00:00:00.000Z',
//                         passportNo: '123456789',
//                         issuePlace: 'New York',
//                     },
//                 },
//             ],
//         },
//     },
// });

// beforeEach(() => {
//     store.clearActions();
// });

// test('renders BookingHistory', () => {
//     render(
//         <Provider store={store}>
//             <BookingHistory />
//         </Provider>
//     );

//     expect(screen.getByText(/Booking History/i)).toBeInTheDocument();
//     expect(screen.getByText(/Booking ID: bookingId1/i)).toBeInTheDocument();
//     expect(screen.getByText(/Source: USA - JFK \(JFK\)/i)).toBeInTheDocument();
//     expect(screen.getByText(/Destination: UK - Heathrow \(LHR\)/i)).toBeInTheDocument();
//     expect(screen.getByText(/Date: 3\/14\/2025/i)).toBeInTheDocument();
//     expect(screen.getByText(/Passport Details:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Issue Date: 2\/23\/2025/i)).toBeInTheDocument();
//     expect(screen.getByText(/Passport No: 123456789/i)).toBeInTheDocument();
//     expect(screen.getByText(/Issue Place: New York/i)).toBeInTheDocument();
//     expect(screen.getByText(/Approved/i)).toBeInTheDocument();
// });

// test('dispatches fetchBookingHistoryRequest on mount', () => {
//     render(
//         <Provider store={store}>
//             <BookingHistory />
//         </Provider>
//     );

//     expect(fetchBookingHistoryRequest).toHaveBeenCalledWith('userId');
// });

// test('shows loading state', () => {
//     const loadingStore = mockStore({
//         loginUser: {
//             data: {
//                 user: {
//                     _id: 'userId',
//                 },
//             },
//         },
//         allBookings: {
//             loading: true,
//             error: null,
//             bookings: null,
//         },
//     });

//     render(
//         <Provider store={loadingStore}>
//             <BookingHistory />
//         </Provider>
//     );

//     expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
// });

// test('shows error state', () => {
//     const errorStore = mockStore({
//         loginUser: {
//             data: {
//                 user: {
//                     _id: 'userId',
//                 },
//             },
//         },
//         allBookings: {
//             loading: false,
//             error: 'Error fetching bookings',
//             bookings: null,
//         },
//     });

//     render(
//         <Provider store={errorStore}>
//             <BookingHistory />
//         </Provider>
//     );

//     expect(screen.getByText(/Error fetching bookings/i)).toBeInTheDocument();
// });