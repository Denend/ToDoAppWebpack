import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import reducer from "./reducer";
import initSubscriber from "redux-subscriber";

const persistConfig = {
	key: "root",
	storage
	// whitelist: "notes"
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
	let store = createStore(persistedReducer, applyMiddleware(logger));
	let persistor = persistStore(store);
	const subscribe = initSubscriber(store);

	return { store, persistor, subscribe };
};
