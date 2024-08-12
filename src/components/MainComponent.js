import React from "react";
import { connect } from "react-redux";
import { deleteTask, fetchTasks, postTask, updateTasks, taskUpdateComplete, fetchInvoices, createInvoice } from "../redux/ActionCreators";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Edit from "./EditComponent";
import AllTasks from "./AllTasksComponent";
import Invoices from "./InvoicesComponent";
import { Box, Alert, Snackbar, Toolbar, CssBaseline } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

const mapStateToProps = state => {
	const sortedTasksByDate = state.tasks.tasks.sort(function(a,b){
		// Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
		return new Date(b.date) - new Date(a.date);
	  });
	return {tasks: sortedTasksByDate, taskUpdated: state.tasks.hasUpdated, isLoading: state.tasks.isLoading, errMessage: state.tasks.errMessage, invoices: state.invoices}
};

const mapDispatchToProps = (dispatch) => ({
	fetchTasks: () => dispatch(fetchTasks()),
	updateTasks: (id, newTasks) => dispatch(updateTasks(id, newTasks)),
	taskUpdateComplete: () => dispatch(taskUpdateComplete()),
	postTask: (newTask) => dispatch(postTask(newTask)),
	deleteTask: (id) => dispatch(deleteTask(id)),
	fetchInvoices: () => dispatch(fetchInvoices()),
	addInvoice: (rate) => dispatch(createInvoice(rate)),
});

const drawerWidth = 240;

function Main(props) {
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		props.fetchTasks();
		props.fetchInvoices();
	}, []);

	const EditWithID = () => {
		let params = useParams();
		return(
			<Edit
				task={props.tasks.filter((task) => task._id === params.itemId)[0]}
				updateItem={props.updateTasks}
				taskUpdated={props.taskUpdated}
				updateComplete={props.taskUpdateComplete}
			/>
		);
	}

	return(
		<Box className="app" sx={ { display: 'flex' } }>
			<CssBaseline />
			<Header drawerWidth={drawerWidth}/>
			<Box
				component="main"
				sx={ { flexGrow: 1, p: 3, width: { sm: `calc(100% - ${ drawerWidth }px)` }, bgcolor: 'grey.100' } }
			>
				<Toolbar />
				{
					props.errMessage &&
					<Snackbar autoHideDuration={ 5000 } open={ open } onClose={ handleClose }>
						<Alert severity="error">{ props.errMessage }</Alert>
					</Snackbar>
				}
				<Routes>
					<Route exact path="/" element={ <Home tasks={ props.tasks } createTask={ props.postTask } removeTask={ props.deleteTask } /> } />
					<Route path="/edit/:itemId" element={ <EditWithID /> } />
					<Route path="/timesheet" element={ <AllTasks tasks={ props.tasks } createTask={ props.postTask } removeTask={ props.deleteTask } /> } />
					<Route path="/allinvoices" element={ <Invoices invoices={ props.invoices } generateInvoice={ props.addInvoice } /> } />
				</Routes>
			</Box>			
		</Box>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
