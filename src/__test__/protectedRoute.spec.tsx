import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter, useNavigate } from 'react-router';
import ProtectedRoute from '../auth/ProtectedRoute';

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
            role: 'manager', // or any role you want to test
        },
    },
});

let navigate: jest.Mock;
beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
});

test('renders ProtectedRoute', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProtectedRoute />
            </MemoryRouter>
        </Provider>
    );
});