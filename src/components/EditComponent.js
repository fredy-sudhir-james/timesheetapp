import React from "react";
import { Container, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, TextareaAutosize, FormGroup, Stack, MenuItem, Button, Grid, Typography, Alert } from '@mui/material';
import { Link } from "react-router-dom";
import { pink } from '@mui/material/colors';
import { Home } from "@mui/icons-material";

function UpdateMessage(props) {
	const [alert, setAlert] = React.useState(true);

	React.useEffect(() => {
		// when the component is mounted, the alert is displayed for 3 seconds
		setTimeout(() => {
		  setAlert(false);
		  props.updateComplete();
		}, 3000);
	}, []);

	return (
		<React.Fragment>
		{
			alert && 
			<Box py={3}>
				<Alert severity="success">
					<strong>The task has been updated succesfully!</strong>
				</Alert>
			</Box>
		}
		</React.Fragment>
	)
}

function Edit(props) {
	const [item, setItem] = React.useState();
	const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
	const localISOTime = new Date(Date.now() - timeZoneOffset).toISOString().split('T')[0];

	React.useEffect(() => {
		if ( props.task ) {
			setItem({
				"task": props.task.task,
				"hours": props.task.hours,
				"invoiced": props.task.invoiced,
				"date": props.task.date
				}
			);
		}
	}, []);

	const handleChange = (event) => {
		setItem((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value
			}
		))
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(item);
		props.updateItem(props.task._id,item);
	}

	return(
		<div className='app__body'>

			{
				item &&
				<Container sx={{color: 'primary.contrastText'}}>
					<Box py={2} mb={2}>
						<Link to={'/'} style={{color: pink[900], display: 'inline-flex', alignItems: 'center', textDecoration: 'none', fontSize: '1.15rem', borderBottom: '2px solid'}}><Home />&nbsp; Back to Home</Link>
					</Box>
					{
						props.taskUpdated &&
						<UpdateMessage updateComplete={props.updateComplete}/>						
					}
					<Box sx={{borderBottom: '1px solid white'}} py={1} mb={5}>
						<Typography component="h3" variant="h4">Edit details of the entry: {props.task._id}</Typography>
					</Box>
					<Table sx={{marginBottom: '40px'}}>
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Task</TableCell>
								<TableCell>Hours</TableCell>
								<TableCell>invoiced</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow key={item._id}>
								<TableCell>{item.date.substring(0, 10)}</TableCell>
								<TableCell>{item.task}</TableCell>
								<TableCell>{item.hours}</TableCell>
								<TableCell>{item.invoiced ? "yes" : "no"}</TableCell>
								<TableCell>{item._id}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					<Box
						mt={3}
						component="form"
						noValidate
						autoComplete="off"
						onSubmit={handleSubmit}
					>
						<Grid container spacing={2}>
							<Grid item xs={4}>
								<TextField
									id="date"
									label="Date"
									type="date"
									name="date"
									value={item.date.substring(0, 10)}
									onChange={handleChange}
									inputProps={{
										max: localISOTime
									}}
									InputProps={{
										style: {
											color: 'white'
										},
									}}
									InputLabelProps={{
										style: {
										  color: 'white'
										}
									}}
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									id="hours"
									label="Hours"
									type="number"
									inputProps={{
										min: 0,
										step: "0.25"
									}}
									name="hours"
									value={item.hours}
									onChange={handleChange}
									InputProps={{
										style: {
											color: 'white'
										},
									}}
									InputLabelProps={{
										style: {
										  color: 'white'
										}
									}}
									>
								</TextField>
							</Grid>
							<Grid item xs={4}>
								<TextField
									id="invoice"
									select
									label="Invoiced?"
									name="invoiced"
									value={item.invoiced}
									onChange={handleChange}
									helperText="Please select if invoiced"
									InputProps={{
										style: {
											color: 'white'
										},
									}}
									InputLabelProps={{
										style: {
										  color: 'white'
										}
									}}
									FormHelperTextProps={{
										style: {
										  color: 'white'
										}
									  }}
									>
									<MenuItem value={true}>
										Yes
									</MenuItem>
									<MenuItem value={false}>
										No
									</MenuItem>
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextareaAutosize
									aria-label="minimum height"
									minRows={8}
									style={{
										width: '100%',
										backgroundColor: 'transparent',
										padding: '10px',
										color: 'white'
									}}
									placeholder="Minimum 3 rows"
									value={item.task}
									name="task"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button variant="contained" type="submit">Save</Button>
							</Grid>
						</Grid>
						
					</Box>
				</Container>
			}
			
		</div>
	)
}

export default Edit;
