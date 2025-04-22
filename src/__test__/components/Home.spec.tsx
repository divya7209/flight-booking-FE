import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigate } from 'react-router';
import Home from '../../components/Home';
import * as Yup from 'yup';
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
    project: {
        projects: [
            { id: '1', name: 'Project 1' },
            { id: '2', name: 'Project 2' },
        ],
    },
    loginUser: {
        data: {
            user: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                projects: 'Project 1',
                mobile: '1234567890',
                role: 'employee',
            },
        },
    },
});

let navigate: jest.Mock;
beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
});
jest.mock('yup', () => {
    const originalModule = jest.requireActual('yup');
    return {
        ...originalModule,
        object: jest.fn().mockReturnValue({
            shape: jest.fn().mockReturnThis(),
            required: jest.fn().mockReturnThis(),
            email: jest.fn().mockReturnThis(),
        }),
        string: jest.fn().mockReturnValue({
            required: jest.fn().mockReturnThis(),
            email: jest.fn().mockReturnThis(),
        }),
    };
});

test('mocks Yup validation schema', () => {
    render(<Home />);

    // Your assertions here
    expect(Yup.object).toHaveBeenCalled();
    expect(Yup.string).toHaveBeenCalled();
});
test('renders Home', () => {
    render(
        <Provider store={store}>
            <Home />
        </Provider>
    );
    expect(screen.getByText(/User Basic Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Select travel partner for booking airline ticket and lodging/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Assigned Project/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Booking/i)).toBeInTheDocument();
});

test('submits the form', async () => {
    render(
        <Provider store={store}>
            <Home />
        </Provider>
    );

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Assigned Project/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Go to Booking/i));
    expect(navigate).toHaveBeenCalled();
});