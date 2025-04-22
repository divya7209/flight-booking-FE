export const approveBookingRequest = (id: string) => ({
    type: 'APPROVE_BOOKING_REQUEST',
    payload: id,
});

export const rejectBookingRequest = (id: string) => ({
    type: 'REJECT_BOOKING_REQUEST',
    payload: id,
});
export const fetchManagerBookingsRequest = (managerId: string) => ({
    type: 'FETCH_MANAGER_BOOKINGS_REQUEST',
    payload: managerId,
});