import { approveBookingRequest, fetchManagerBookingsRequest, rejectBookingRequest } from "../../redux/actions/statusAction";

describe('Given Booking Management Actions', () => {
    describe('when calling booking management action creators', () => {
        it('should create approveBookingRequest', () => {
            const id = 'booking123';
            const result = approveBookingRequest(id);
            expect(result).toEqual({
                type: 'APPROVE_BOOKING_REQUEST',
                payload: id
            });
        });

        it('should create rejectBookingRequest', () => {
            const id = 'booking123';
            const result = rejectBookingRequest(id);
            expect(result).toEqual({
                type: 'REJECT_BOOKING_REQUEST',
                payload: id
            });
        });

        it('should create fetchManagerBookingsRequest', () => {
            const managerId = 'manager123';
            const result = fetchManagerBookingsRequest(managerId);
            expect(result).toEqual({
                type: 'FETCH_MANAGER_BOOKINGS_REQUEST',
                payload: managerId
            });
        });
    });
});