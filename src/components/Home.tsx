import { useSelector } from "react-redux"
import { IStore } from "../interfaces/store"
import { useState, useRef } from "react"
import BookingForm from "./BookingForm"

const Home = () => {
    const [category, setCategory] = useState("")
    const { data } = useSelector((state: IStore) => state.loginUser)
    const bookFormRef = useRef<HTMLDivElement>(null); // Create a ref for the BookForm component
    const categories = ["Business plan meeting", "Sales Conference", "Project discussion", "Project Training", "Events", "Customer visit"]
    const handleGoToBooking = () => {
        if (bookFormRef.current) {
            bookFormRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the BookForm component
        }
    };
    return (
        <>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">User Basic Details</p>
                                <p>Select travel partner for booking airline ticket and lodging</p>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="full_name">Full Name<span className="text-red-500">*</span></label>
                                        <input type="text" value={data?.user?.name} name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="email">Email Address<span className="text-red-500">*</span></label>
                                        <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data?.user?.email} />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label htmlFor="address">Assigned Project<span className="text-red-500">*</span></label>
                                        <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data?.user?.projects} placeholder="" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="city">Mobile<span className="text-red-500">*</span></label>
                                        <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data?.user?.mobile} placeholder="" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="country">Role<span className="text-red-500">*</span></label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <input name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value={data?.user?.role} />
                                            <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                            <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="state">Category<span className="text-red-500">*</span></label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <select required onChange={(e) => setCategory(e.target.value)} name="state" id="state" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value={category}>
                                                <option disabled value="">Select Category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:col-span-5 text-right">
                                        <div className="inline-flex items-end">
                                            <button onClick={handleGoToBooking} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go to Booking</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div ref={bookFormRef}>
                <BookingForm />
            </div>
        </>
    )
}

export default Home