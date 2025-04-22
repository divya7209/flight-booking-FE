import { IBooking, IBookingData } from "../../interfaces/booking";
import { CREATE_BOOKING_FAILURE, CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS } from "../../constants/booking";

/**
 * createBookingRequest action creator
 * @param bookingData 
 * @returns an action 
 */
export const createBookingRequest = (bookingData: IBookingData) => ({ type: CREATE_BOOKING_REQUEST, payload: bookingData });

/**
 * createBookingSuccess action creator
 * @param booking 
 * @returns action
 */
export const createBookingSuccess = (booking: IBooking) => ({ type: CREATE_BOOKING_SUCCESS, payload: booking });

/**
 * createBookingFailure action creator
 * @param error 
 * @returns action
 */
export const createBookingFailure = (error: string) => ({ type: CREATE_BOOKING_FAILURE, payload: error });
