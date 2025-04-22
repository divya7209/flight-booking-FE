import { applyMiddleware, legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootSaga from "./saga/rootSaga";
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
};

export const { store, persistor } = makeStore();
