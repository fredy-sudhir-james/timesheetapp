import * as ActionTypes from './ActionTypes';

export const Invoices = ( state = {
		isLoading: true,
		errMessage: null,
		invoices: []
	}, action ) => {
	switch(action.type) {
		case ActionTypes.GET_INVOICES:
			return {...state, isLoading: false, errMessage: null, invoices: action.payload};
		case ActionTypes.INVOICE_LOADING: 
			return {...state, isLoading: true, errMessage: null};
		case ActionTypes.INVOICE_FAILED:
			return {...state, isLoading: false, errMessage: action.payload};
		case ActionTypes.ADD_NEW_INVOICE:
			return {...state, isLoading: false, errMessage: null, invoices: state.invoices.concat(action.payload)};
		default:
			return state;
	}
}
