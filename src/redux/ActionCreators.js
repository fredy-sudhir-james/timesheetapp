import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addTasks = (tasks) => ({
	type: ActionTypes.ADD_TASKS,
	payload: tasks
});

export const addNewTask = (task) => ({
	type: ActionTypes.ADD_NEW_TASK,
	payload: task
});

export const tasksUpdated = () => ({
	type: ActionTypes.TASKS_UPDATED,
});

export const taskUpdateComplete = () => ({
	type: ActionTypes.TASKS_UPDATE_COMPLETE,
});

export const fetchTasks = () => (dispatch) => {
	dispatch(tasksLoading(true));
	return fetch( baseUrl + 'tasks')
	.then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })
	.then( response => response.json() )
	.then( result => dispatch( addTasks(result) ) )
	.catch( error => {
		dispatch( tasksFailed(error) );
	});
}

export const postTask = (newTask) => (dispatch) => {
	dispatch(tasksLoading(true));
	return fetch( baseUrl + 'tasks', {
		method: 'POST',
		body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json"
        },
	})
	.then(response => {
			if ( response.ok ) {
				return response;
			} else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			throw error;
		}
	)
	.then( response => response.json() )
	.then( result => dispatch( addNewTask(result) ) )
	.catch( error => {
		dispatch(tasksFailed(error.message));
	});
}

export const updateTasks = (id, newTasks) => (dispatch) => {
	dispatch(tasksLoading(true));
	return fetch( baseUrl + 'tasks/' + id, {
		method: 'PUT',
		body: JSON.stringify(newTasks),
        headers: {
          "Content-Type": "application/json"
        },
	})
	.then(response => {
			if ( response.ok ) {
				return response;
			} else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			throw error;
		}
	)
	.then( response => response.json() )
	.then( result => {
		if ( result.updated ) {
			dispatch(fetchTasks());
			dispatch(tasksUpdated());
		}
	})
	.catch( error => {
		dispatch(tasksFailed(error.message));
	});
}

export const deleteTask = (id) => (dispatch) => {
	return fetch( baseUrl + 'tasks/' + id, {
		method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
	})
	.then(response => {
			if ( response.ok ) {
				return response;
			} else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			throw error;
		}
	)
	.then( response => response.json() )
	.then ( result => {
		dispatch(fetchTasks());
	})
	.catch( error => {
		dispatch(tasksFailed(error.message));
	});
}

export const tasksLoading = () => ({
	type: ActionTypes.TASKS_LOADING
});

export const tasksFailed = (errmess) => ({
	type: ActionTypes.TASKS_FAILED,
	payload: errmess
});

export const getInvoices = (invoices) => ({
	type: ActionTypes.GET_INVOICES,
	payload: invoices
});

export const invoiceLoading = () => ({
	type: ActionTypes.INVOICE_LOADING
});

export const fetchInvoices = () => (dispatch) => {
	dispatch(invoiceLoading(true));
	return fetch( baseUrl + 'allinvoice')
	.then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })
	.then( response => response.json() )
	.then( result => dispatch( getInvoices(result.invoices) ) )
	.catch( error => {
		dispatch( invoiceFailed(error) );
	});
}

export const invoiceFailed = (errmess) => ({
	type: ActionTypes.INVOICE_FAILED,
	payload: errmess
});

export const createInvoice = (rate) => (dispatch) => {
	dispatch(invoiceLoading(true));
	return fetch( baseUrl + 'allinvoice', {
		method: 'POST',
		body: JSON.stringify(rate),
        headers: {
          "Content-Type": "application/json"
        },
	})
	.then(response => {
		console.log('Response: ', response);
			if ( response.ok ) {
				return response;
			} else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			throw error;
		}
	)
	.then( response => response.json() )
	.then( result => {
			console.log('Result: ', result);
			dispatch( addNewInvoice(result.inv) )
		}
	)
	.catch( error => {
		dispatch(invoiceFailed(error.message));
	});
}

export const addNewInvoice = (invoice) => ({
	type: ActionTypes.ADD_NEW_INVOICE,
	payload: invoice
})
