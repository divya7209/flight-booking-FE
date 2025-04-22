import { Suspense, lazy, FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";

import Loader from "./components/Loader";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./core/Header";
import Home from "./components/Home";

import "./index.css";

// import BookingHistory from "./components/BookingHistory";
// import BookingStatusList from "./components/BookingStatusList";
const Login = lazy(() => import("./components/Login"));
// const Register = React.lazy(() => import("./components/Register"));
const NotFound = lazy(() => import("./components/NotFound"));
const BookingHistory = lazy(() => import("./components/BookingHistory"));
const BookingStatusList = lazy(() => import("./components/BookingStatusList"));


const App: FC = () => (
  <Box className="flex w-full h-full flex-col">
    <ToastContainer position="top-right" autoClose={5000} />
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/status" element={<BookingStatusList />} />

          </Route>
          <Route path="/" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </Box>
);

export default App;
