
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchBookingHistoryRequest } from '../redux/actions/historyAction';
import { IStore } from '../interfaces/store';
import { approveBookingRequest, rejectBookingRequest } from '../redux/actions/statusAction';
import Loader from './Loader';

const BookingHistory: React.FC = () => {
    const dispatch = useDispatch();
    const { data: currentUser } = useSelector((store: IStore) => store.loginUser);
    const allBookings = useSelector((state: IStore) => state.allBookings);
    useEffect(() => {
        if (currentUser?.user?._id) {
            dispatch(fetchBookingHistoryRequest(currentUser.user._id));
        }
    }, [dispatch, currentUser]);

    const handleApprove = (id: string) => {
        dispatch(approveBookingRequest(id));
    };

    const handleReject = (id: string) => {
        dispatch(rejectBookingRequest(id));
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="text-gray-600">
                        <p className="font-medium text-lg mb-4">Booking History</p>
                        {allBookings?.loading ? (
                            <Loader />
                        ) : (
                            <ul className="space-y-4">
                                {allBookings?.bookings?.bookings?.map((booking: any) => (
                                    <li key={booking._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="font-semibold text-lg">Booking ID: {booking._id}</p>
                                            <p
                                                className={`text-sm font-medium cursor-pointer ${booking.status === 'approved' ? 'text-green-500' : booking.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}
                                                onClick={() => {
                                                    if (booking.status === 'pending') {
                                                        if (window.confirm('Approve this booking?')) {
                                                            handleApprove(booking._id);
                                                        } else {
                                                            handleReject(booking._id);
                                                        }
                                                    }
                                                }}
                                            >
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p><strong>Source:</strong> {booking.sourceCountry} - {booking.sourceAirport.name} ({booking.sourceAirport.code})</p>
                                                <p><strong>Destination:</strong> {booking.destinationCountry} - {booking.destinationAirport.name} ({booking.destinationAirport.code})</p>
                                                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p><strong>Passport Details:</strong></p>
                                                <ul className="ml-4 list-disc">
                                                    <li><strong>Issue Date:</strong> {new Date(booking.passportDetails.issueDate).toLocaleDateString()}</li>
                                                    <li><strong>Passport No:</strong> {booking.passportDetails.passportNo}</li>
                                                    <li><strong>Issue Place:</strong> {booking.passportDetails.issuePlace}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingHistory;
