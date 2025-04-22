/**
 * Booking actions types
 */
export interface IVisa {
    issueDate: Date;
    expiryDate: Date;
    visaNo: string;
    issuePlace: string;
}

export interface IPassport {
    issueDate: Date;
    passportNo: string;
    issuePlace: string;
}

export interface IBookingData {
    employeeId: string
    sourceCountry: string;
    sourceAirport: {
        code: string;
        name: string;
    };
    destinationCountry: string;
    destinationAirport: {
        code: string;
        name: string;
    };
    date: Date;
    visaDetails: IVisa;
    passportDetails: IPassport;
    status?: "pending" | "approved" | "rejected"; // Optional, default is "pending"
}

export interface IBooking extends IBookingData {
    _id: string
    createdAt: Date;
}

/**
 * Booking Reducers types
 */
export interface BookingState {
    booking: IBooking | null;
    isLoading: boolean;
    error: string | null;
}


