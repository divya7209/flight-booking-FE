import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigate } from 'react-router';
import Login from '../../components/Login';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
    loginUser: {
        data: {
            role: 'manager',  //or any role you want to test
        },
    },
});
let navigate: jest.Mock;
beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
});
// reder the form
test('renders ProjectForm', () => {

    render(
        <Provider store={store}>
            <Login />
        </Provider>
    );

});

// test('submits the form', async () => {
//     render(
//         <Provider store={store}>
//             <ProjectForm />
//         </Provider>
//     );

//     fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: 'New Project' } });
//     fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Project Description' } });
//     fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-01-01' } });
//     fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2023-12-31' } });

//     fireEvent.click(screen.getByText(/Create Project/i));

// });
