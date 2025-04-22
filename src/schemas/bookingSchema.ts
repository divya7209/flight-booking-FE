import * as Yup from 'yup'

export const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee ID is required'),
    sourceCountry: Yup.string().required('Source Country is required'),
    // sourceAirport: Yup.string().required('Source Airport is required'),
    destinationCountry: Yup.string().required('Destination Country is required'),
    // destinationAirport: Yup.string().required('Destination Airport is required'),
    date: Yup.date().required('Date is required'),
    visaDetails: Yup.object({
        issueDate: Yup.date().required('Visa Issue Date is required'),
        expiryDate: Yup.date().required('Visa Expiry Date is required'),
        visaNo: Yup.string().required('Visa Number is required'),
        issuePlace: Yup.string().required('Visa Issue Place is required')
    }),
    passportDetails: Yup.object({
        issueDate: Yup.date().required('Passport Issue Date is required'),
        passportNo: Yup.string().required('Passport Number is required'),
        issuePlace: Yup.string().required('Passport Issue Place is required')
    })
});