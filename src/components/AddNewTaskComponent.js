import React from "react";
import { Button, Modal, Typography, Box, Stack, TextField, TextareaAutosize } from '@mui/material';
import { Close } from '@mui/icons-material';

function AddNewTask(props) {
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
						/>
						<TextareaAutosize
							aria-label="minimum height"
							minRows={4}
							placeholder="Add task description"
							name="task"
							style={{
								padding: '10px',
							}}
						/>
						<TextField
							id="hours"
							label="Hours"
							type="number"
							inputProps={{
								min: 0,
								step: "0.25"
							}}
							name="hours"
							defaultValue={0.25}
							>
						</TextField>
						<Button variant="contained" type="submit">Save</Button>
					</Stack>
				</Box>
			</Modal>
		</div>
	)
}

export default AddNewTask;
