import { all } from 'redux-saga/effects';
import rootSaga from '../../redux/saga/rootSaga';
import userSaga from '../../redux/saga/user';
import { watchBookingActions } from '../../redux/saga/statusSaga';
import { bookingWatcherSaga } from '../../redux/saga/bookingSaga';
import { countryAirportWatcherSaga } from '../../redux/saga/countryAirportSaga';
import { watchFetchBookingHistory } from '../../redux/saga/historySaga';


describe('rootSaga', () => {
    it('should run all sagas', () => {
        const generator = rootSaga();

        expect(generator.next().value).toEqual(
            all([
                userSaga(),
                watchBookingActions(),
                bookingWatcherSaga(),
                countryAirportWatcherSaga(),
                bookingWatcherSaga(),
                watchFetchBookingHistory()
            ])
        );

        expect(generator.next().done).toBe(true);
    });
});