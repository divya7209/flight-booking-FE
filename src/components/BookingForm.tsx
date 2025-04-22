// BookingForm.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, ErrorMessage, FastField } from 'formik';
import { fetchAirportsRequest, fetchCountriesRequest } from '../redux/actions/countryAirport';
import { createBookingRequest } from '../redux/actions/bookingAction';
import { IStore } from '../interfaces/store';
import { validationSchema } from '../schemas/bookingSchema';
import { toast } from 'react-toastify';

const BookingForm: React.FC = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state: any) => state.countries);
    const { data: currentUser } = useSelector((store: IStore) => store.loginUser);
    //  console.log('first', )
    console.log('countries', countries)
    const airports = useSelector((state: any) => state.airports);
    const booking = useSelector((state: any) => state.booking);
    console.log('bookingData', booking)
    console.log('airports', airports)

    useEffect(() => {
        dispatch(fetchCountriesRequest());
    }, [dispatch]);

    const initialValues = {
        employeeId: currentUser?.user?._id || '',
        sourceCountry: '',
        sourceAirport: {
            code: '',
        },
        destinationCountry: '',
        destinationAirport: {
            code: '',
        },
        date: new Date(),
        visaDetails: {
            issueDate: new Date(),
            expiryDate: new Date(),
            visaNo: '',
            issuePlace: ''
        },
        passportDetails: {
            issueDate: '',
            passportNo: '',
            issuePlace: ''
        }
    };

    const handleSubmit = (values: any) => {
        // dispatch(createBookingRequest(values));
        // console.log('values', values)
        const payload = {
            ...values,
            sourceAirport: {
                code: values.sourceAirport.code,
                name: values.sourceAirport.name
            },
            destinationAirport: {
                code: values.destinationAirport.code,
                name: values.destinationAirport.name
            }
        };
        dispatch(createBookingRequest(payload));
        toast.success('Booking successfully created!');
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                            <div className="container max-w-screen-lg mx-auto">
                                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                        <div className="text-gray-600">
                                            <p className="font-medium text-lg">Booking Details</p>
                                            <p>Fill in the details to book your travel</p>
                                        </div>
                                        <div className="lg:col-span-2">
                                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                                <div className="md:col-span-1">
                                                    <label htmlFor="employeeId">Employee ID<span className="text-red-500">*</span></label>
                                                    <FastField type="text" name="employeeId" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={currentUser?.user?.sapId} />
                                                    <ErrorMessage name="employeeId" component="div" className="text-red-500 text-xs mt-1" />
                                                </div>
                                                <div className="md:col-span-1">
                                                    <label htmlFor="sourceCountry">Source Country<span className="text-red-500">*</span></label>
                                                    <FastField as="select" name="sourceCountry" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                        setFieldValue('sourceCountry', e.target.value);
                                                        dispatch(fetchAirportsRequest(e.target.value));
                                                    }}>
                                                        <option value="">Select Country</option>
                                                        {countries?.countries?.map((country: { _id: string, country: string }) => (
                                                            <option key={country._id} value={country.country}>{country.country}</option>
                                                        ))}
                                                    </FastField>
                                                    <ErrorMessage name="sourceCountry" component="div" className="text-red-500 text-xs mt-1" />
                                                </div>
                                                <div className="md:col-span-5">
                                                    <label htmlFor="sourceAirport">Source Airport<span className="text-red-500">*</span></label>

                                                    <FastField value={values?.sourceAirport?.code || ''} as="select" name="sourceAirport" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                        const selectedAirport = airports?.airports?.find((airport: any) => airport.code === e.target.value);
                                                        setFieldValue('sourceAirport', { code: selectedAirport.code, name: selectedAirport.name });
                                                    }}>
                                                        <option value="">Select Airport</option>
                                                        {airports?.airports?.map((airport: any) => (
                                                            <option key={airport.code} value={airport.code}>{airport.name}</option>
                                                        ))}
                                                    </FastField>
                                                    <ErrorMessage name="sourceAirport" component="div" className="text-red-500 text-xs mt-1" />
                                                </div>
                                                <div className="md:col-span-5">
                                                    <label htmlFor="destinationCountry">Destination Country<span className="text-red-500">*</span></label>
                                                    <FastField as="select" name="destinationCountry" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                        setFieldValue('destinationCountry', e.target.value);
                                                        dispatch(fetchAirportsRequest(e.target.value));
                                                    }}>
                                                        <option value="">Select Country</option>
                                                        {countries?.countries?.map((country: { _id: string, country: string }) => (
                                                            <option key={country._id} value={country.country}>{country.country}</option>
                                                        ))}
                                                    </FastField>
                                                    <ErrorMessage name="destinationCountry" component="div" className="text-red-500 text-xs mt-1" />
                                                </div>
                                                <div className="md:col-span-5">
                                                    <label htmlFor="destinationAirport">Destination Airport<span className="text-red-500">*</span></label>

                                                    <FastField as="select" value={values?.destinationAirport?.code || ''} name="destinationAirport" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                        const selectedAirport = airports?.airports?.find((airport: any) => airport.code === e.target.value);
                                                        setFieldValue('destinationAirport', { code: selectedAirport.code, name: selectedAirport.name });
                                                    }}>
                                                        <option value="">Select Airport</option>
                                                        {airports?.airports?.map((airport: any) => (
                                                            <option key={airport.code} value={airport.code}>{airport.name}</option>
                                                        ))}
                                                    </FastField>
                                                    <ErrorMessage name="destinationAirport" component="div" className="text-red-500 text-xs mt-1" />
                                                </div>
                                                <div className="lg:col-span-2">
                                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                                        <div className="md:col-span-1">
                                                            <label htmlFor="date">Date<span className="text-red-500">*</span></label>
                                                            <FastField type="date" min={new Date().toISOString().split('T')[0]} name="date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                                            <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1" />
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label htmlFor="visaDetails.issueDate">Visa Issue Date<span className="text-red-500">*</span></label>
                                                            <FastField type="date" name="visaDetails.issueDate" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                                            <ErrorMessage name="visaDetails.issueDate" component="div" className="text-red-500 text-xs mt-1" />
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label htmlFor="visaDetails.expiryDate">Visa Expiry Date<span className="text-red-500">*</span></label>
                                                            <FastField type="date" name="visaDetails.expiryDate" min={new Date().toISOString().split('T')[0]} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                                            <ErrorMessage name="visaDetails.expiryDate" component="div" className="text-red-500 text-xs mt-1" />
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label htmlFor="visaDetails.visaNo">Visa Number<span className="text-red-500">*</span></label>
                                                            <FastField type="text" name="visaDetails.visaNo" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                                            <ErrorMessage name="visaDetails.visaNo" component="div" className="text-red-500 text-xs mt-1" />
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label htmlFor="visaDetails.issuePlace">Visa Issue Place<span className="text-red-500">*</span></label>
                                                            <FastField type="text" name="visaDetails.issuePlace" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                                            <ErrorMessage name="visaDetails.issuePlace" component="div" className="text-red-500 text-xs mt-1" />
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label htmlFor="passportDetails.issueDate">Passport Issue Date<span className="text-red-500">*</span></label>
                                                            <FastField type="date" name="passportDetails.issueDate" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                                            <ErrorMessage name="passportDetails.issueDate" component="div" className="text-red-500 text-xs mt-1" />
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label htmlFor="passportDetails.passportNo">Passport Number<span className="text-red-500">*</span></label>
                                                            <FastField type="text" name="passportDetails.passportNo" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                                            <ErrorMessage name="passportDetails.passportNo" component="div" className="text-red-500 text-xs mt-1" />
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label htmlFor="passportDetails.issuePlace">Passport Issue Place<span className="text-red-500">*</span></label>
                                                            <FastField type="text" name="passportDetails.issuePlace" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                                            <ErrorMessage name="passportDetails.issuePlace" component="div" className="text-red-500 text-xs mt-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-5 text-right">
                                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit Booking</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default BookingForm;