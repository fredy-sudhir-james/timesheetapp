import React from "react";
import { Link } from "react-router-dom";
import { Container, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, Typography, Box, Stack, TextField, TextareaAutosize, Grid, Item } from '@mui/material';
import { Close, DeleteForever, Edit } from '@mui/icons-material';
import { indigo } from "@mui/material/colors";
import AddNewTask from "./AddNewTaskComponent";

function Hours(props) {
	const tobeInvoiceHours = props.allTasks.reduce((acc, current) => {
		return ! current.invoiced ? acc + current.hours : acc;
	}, 0);

	const totalHours = props.allTasks.reduce((acc, current) => {
		return acc + current.hours;
	}, 0);

	return(
		<React.Fragment>
			<p>Total hours: {totalHours ? totalHours : 0}</p>
			<p>Hours to be invoiced: {tobeInvoiceHours ? tobeInvoiceHours : 0}</p>
		</React.Fragment>
	);
}

function Home(props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
	const localISOTime = new Date(Date.now() - timeZoneOffset).toISOString().split('T')[0];

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = {
			date: event.target.date.value,
			task: event.target.task.value,
			hours: event.target.hours.value,
		}
		props.createTask(formData);
		setOpen(false);
	}

	const handleDelete = ( taskId ) => {
		let answer = window.confirm( "Proceed with deleting the task?" );
		if ( answer ) {
			props.removeTask( taskId );
		}
	}

	const blueLink = {
		textDecoration: 'none',
		display: 'inline-flex',
		alignItems: 'center',
	}

	return(
		<div className='app__body'>
			<Box>
				<Hours allTasks={props.tasks}/>
				<p>Last invoice: </p>

				<AddNewTask createTask={props.createTask}/>

				<Box sx={{py: 2}}>
					<Typography>Latest 10 tasks</Typography>
				</Box>

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow sx={{ 'th': {color: 'white'}}}>
								<TableCell>Sl.no</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Task</TableCell>
								<TableCell>Hours</TableCell>
								<TableCell>Invoiced?</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody sx={{color: 'white'}}>
							{
							props.tasks.slice(0, 10).map((task, index) => {
								return(
									<TableRow key={task._id} sx={{ 'td': {color: 'white'}}}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{task.date.split('T')[0]}</TableCell>
										<TableCell>{task.task}</TableCell>
										<TableCell>{task.hours}</TableCell>
										<TableCell>{task.invoiced ? "yes" : "no"}</TableCell>
										<TableCell>
											<Grid container columnSpacing={3}>
												<Grid item>
													<Link to={`/edit/${task._id}`} style={{textDecoration: 'none', display: 'inline-flex', alignItems: 'center'}} className='blue-link link-scale'>
														<Edit /><span>&nbsp; Edit</span>
													</Link>
												</Grid>
												<Grid item>
													<span style={{textDecoration: 'none', display: 'inline-flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => handleDelete(task._id)} className="red-link link-scale">
														<DeleteForever /><span>&nbsp; Delete</span>
													</span>
												</Grid>
											</Grid>
											
										</TableCell>
									</TableRow>
								);
							})
							}
						</TableBody>
					</Table>
				</TableContainer>
				
			</Box>
		</div>
	)
}

export default Home;
