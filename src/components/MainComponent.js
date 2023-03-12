import React from "react";
import { connect } from "react-redux";
import { deleteTask, fetchTasks, postTask, updateTasks, taskUpdateComplete } from "../redux/ActionCreators";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Edit from "./EditComponent";
import AllTasks from "./AllTasksComponent";
import { Box, Container } from '@mui/material';
import { teal } from '@mui/material/colors';
import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

const mapStateToProps = state => {
	const sortedTasksByDate = state.tasks.sort(function(a,b){
		// Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
		return new Date(b.date) - new Date(a.date);
	  });
	return {tasks: sortedTasksByDate, taskUpdated: state.hasUpdated, isLoading: state.isLoading, errMessage: state.errMessage}
};

const mapDispatchToProps = (dispatch) => ({
	fetchTasks: () => dispatch(fetchTasks()),
	updateTasks: (id, newTasks) => dispatch(updateTasks(id, newTasks)),
	taskUpdateComplete: () => dispatch(taskUpdateComplete()),
	postTask: (newTask) => dispatch(postTask(newTask)),
	deleteTask: (id) => dispatch(deleteTask(id)),
});

function Main(props) {

	React.useEffect(() => {
		props.fetchTasks();
	}, []);

	console.log(props);

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

	const boxStyle = {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		justifyContent: 'center',
		color: 'primary.contrastText',
		backgroundColor: teal[300]
	}

	const containerStyle = {
		border: '4px solid white',
		borderRadius: '8px',
		padding: '35px 20px',
		boxSizing: 'border-box'
	}

	return(
		<Box className="app" sx={boxStyle} py={5}>
			<Container maxWidth='md' sx={containerStyle}>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home tasks={props.tasks} createTask={props.postTask} removeTask={props.deleteTask} />} />
					<Route path="/edit/:itemId" element={<EditWithID />} />
					<Route path="/timesheet" element={<AllTasks tasks={props.tasks} createTask={props.postTask} removeTask={props.deleteTask}/>} />
				</Routes>
			</Container>
		</Box>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
