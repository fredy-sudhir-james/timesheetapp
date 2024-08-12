import React from "react";
import { Button, Modal, Typography, Box, Stack, TextField, TextareaAutosize } from '@mui/material';
import { Close } from '@mui/icons-material';
import Stopwatch from "./Stopwatch";

function AddNewTask(props) {
	const [open, setOpen] = React.useState(false);
	const [errors, setErrors] = React.useState({});
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
		// Validate form data
		const validationErrors = validateForm(formData);
		if (Object.keys(validationErrors).length === 0) {
			props.createTask(formData);
			setOpen(false);
			setErrors({});  // Clear any previous errors
		} else {
			setErrors(validationErrors);  // Set the validation errors to state
		}
	}

	const validateForm = (data) => {
		const validationErrors = {};
	
		if (!data.date) {
			validationErrors.date = "Date is required";
		}
	
		if (!data.task.trim()) {
			validationErrors.task = "Task description is required";
		}
	
		if (data.hours <= 0) {
			validationErrors.hours = "Hours should be greater than 0";
		}
	
		return validationErrors;
	};

	const handleStopwatchTimer = ( time ) => {
		let hours = time / 60
		let roundedHours = Math.ceil(hours * 4) / 4;
		document.getElementById('hours').value = roundedHours
	}

	return(
		<div>
			<Button variant="contained" onClick={handleOpen}>Add New Task</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
			>
				<Box
					component="form"
					noValidate
					autoComplete="off"
					sx={{
						maxWidth: 450,
						width: '100%',
						backgroundColor: 'white',
						p: 5,
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}
					onSubmit={handleSubmit}
				>	
					<Box sx={{position: 'relative'}}>
						<Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:5}}>
							Add Task
						</Typography>
						<Close sx={{position: 'absolute', top: 0, right: 0, cursor: 'pointer'}} onClick={handleClose}/>
					</Box>
					
					<Stack spacing={3}>
						<TextField
							required
							id="date"
							label="Date"
							type="date"
							name="date"
							inputProps={{
								max: localISOTime
							}}
							InputLabelProps={{
								shrink: true,
							}}
							defaultValue={localISOTime}
							error={!!errors.date}
						/>
						<TextareaAutosize
							required
							label="Task description"
							aria-label="Task description"
							minRows={4}
							placeholder="Add task description"
							name="task"
							style={{
								padding: '10px',
							}}
						/>
						{errors.task && <Typography variant="body2" color="error">{errors.task}</Typography>}
						<TextField
							required
							id="hours"
							label="Hours"
							type="number"
							inputProps={{
								min: 0,
								step: "0.25"
							}}
							helperText="Add in increments of 0.25"
							name="hours"
							defaultValue={0}
							error={!!errors.hours}
							>
						</TextField>
						<Stopwatch timerAddition={handleStopwatchTimer}/>
						<Button variant="contained" type="submit">Save</Button>
					</Stack>
				</Box>
			</Modal>
		</div>
	)
}

export default AddNewTask;
