import React from "react";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Box, Grid } from '@mui/material';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { pink } from '@mui/material/colors';
import { Home } from "@mui/icons-material";
import AddNewTask from "./AddNewTaskComponent";

function AllTasks(props) {
	const handleDelete = ( taskId ) => {
		let answer = window.confirm( "Proceed with deleting the task?" );
		if ( answer ) {
			props.removeTask( taskId );
		}
	}
	return(
		<div className='app__body'>
			<Box>
				<Box py={2} mb={2}>
					<Link to={'/'} style={{color: pink[900], display: 'inline-flex', alignItems: 'center', textDecoration: 'none', fontSize: '1.15rem', borderBottom: '2px solid'}}><Home />&nbsp; Back to Home</Link>
				</Box>
				<AddNewTask createTask={props.createTask}/>

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
							props.tasks.map((task, index) => {
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

export default AllTasks;
