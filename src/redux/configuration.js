import { createStore, combineReducers, applyMiddleware } from "redux";
import { Tasks } from "./tasks";
import { Invoices } from "./invoices";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
	const rootReducer = combineReducers({
        tasks: Tasks,
        invoices: Invoices
    });

	const store = createStore(
		rootReducer, applyMiddleware(thunk, logger)
	);

	return store;
}
