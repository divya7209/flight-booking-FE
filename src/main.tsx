// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { persistor, store } from "./redux/store";
import Loader from "./components/Loader";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
//persistor.purge() // when want to clear the data from redux persist(local storage)
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
      <ToastContainer />
    </PersistGate>
  </Provider>
);