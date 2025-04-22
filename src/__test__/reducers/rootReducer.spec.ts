import bookingReducer from "../../redux/reducers/bookingReducer"
import { airportsReducer } from "../../redux/reducers/countryAirport"
import bookingHistoryReducer from "../../redux/reducers/historyReducer"
import rootReducer from "../../redux/reducers/rootReducer"
import statusReducer from "../../redux/reducers/statusReducer"
import loginUserReducer from "../../redux/reducers/userLoginReducer"


const action = {
    type: "",
    payload: undefined
}

describe('Given RootReducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            loginUser: loginUserReducer(undefined, action),
            airports: airportsReducer,
            booking: bookingReducer,
            allBookings: bookingHistoryReducer,
            bookingStatus: statusReducer

        }
        expect(rootReducer(undefined, action)).toEqual(initialState)

    })
})