import * as ActionTypes from './ActionTypes';

export const Tasks = ( state = {
		isLoading: true,
		hasUpdated: false,
		errMessage: null,
		tasks: []
	}, action ) => {
	switch(action.type) {
		case ActionTypes.ADD_TASKS:
			return {...state, isLoading: false, errMessage: null, tasks: action.payload};
		case ActionTypes.ADD_NEW_TASK:
			var newTask = action.payload;
			return {...state, isLoading: false, errMessage: null, tasks: state.tasks.concat(newTask)};
		case ActionTypes.TASKS_LOADING: 
			return {...state, isLoading: true, hasUpdated: false, errMessage: null};
		case ActionTypes.TASKS_FAILED:
			return {...state, isLoading: false, hasUpdated: false, errMessage: action.payload, tasks: []};
		case ActionTypes.TASKS_UPDATED:
			return {...state, isLoading: false, hasUpdated: true};
		case ActionTypes.TASKS_UPDATE_COMPLETE:
			return {...state, hasUpdated: false};
		default:
			return state;
	}
}
