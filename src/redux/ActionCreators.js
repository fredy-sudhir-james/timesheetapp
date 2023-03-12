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
		console.log(error);
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
		console.log( 'Adding new task failed ', error);
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
		console.log( 'Update error', error);
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
		console.log( 'Task deleted ', result );
		dispatch(fetchTasks());
	})
	.catch( error => {
		console.log( 'Task deletion failed ', error);
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
