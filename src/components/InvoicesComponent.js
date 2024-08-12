import React from "react";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Box, Button, Modal, Typography, TextField, Stack, Alert, Snackbar } from '@mui/material';
import { Home, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { pink } from '@mui/material/colors';
import { baseUrl } from '../shared/baseUrl';

export default function Invoices(props) {
	const [open, setOpen] = React.useState(false);
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	console.log(props)

	React.useEffect(() =>{
		if ( props.invoices.errMessage ) {
			setSnackbarOpen(true);
		}
	}, [props.invoices.errMessage])

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = {
			rate: event.target.rate.value,
		}
		props.generateInvoice(formData);
		setOpen(false);
	}

	return (
		<div className='app__body'>
			<Box>
				<Box py={2} mb={2}>
					<Link to={'/'} style={{color: pink[900], display: 'inline-flex', alignItems: 'center', textDecoration: 'none', fontSize: '1.15rem', borderBottom: '2px solid'}}><Home />&nbsp; Back to Home</Link>
				</Box>

				<Snackbar autoHideDuration={4000} open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
					<Alert severity="error" variant="filled">{props.invoices.errMessage}</Alert>
				</Snackbar>

				<Button variant="contained" onClick={handleOpen}>Generate new Invoice</Button>
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
								Generate New Invoice
							</Typography>
							<Close sx={{position: 'absolute', top: 0, right: 0, cursor: 'pointer'}} onClick={handleClose}/>
						</Box>
						<Stack spacing={3}>
							<TextField
								required
								id="rate"
								label="Hourly rate"
								type="number"
								inputProps={{
									min: 10,
									step: "5"
								}}
								helperText="Add in increments of 5"
								name="rate"
								defaultValue={40}
								>
							</TextField>
							<Button variant="contained" type="submit">Generate</Button>
						</Stack>
					</Box>
				</Modal>

				<TableContainer style={{marginTop: '1rem'}}>
				{
        		props.invoices.invoices && props.invoices.invoices.length > 0 ? (
					<Table>
						<TableHead>
							<TableRow sx={{ 'th': {color: 'white'}}}>
								<TableCell>Inv.no</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Rate</TableCell>
								<TableCell>TotalHours</TableCell>
								<TableCell>Amount</TableCell>
								<TableCell>Document</TableCell>
							</TableRow>
						</TableHead>
						<TableBody sx={{color: 'white'}}>
							{
							props.invoices.invoices.map((invoice) => {
								return(
									<TableRow key={invoice._id} sx={{ 'td': {color: 'white'}}}>
										<TableCell>{invoice.invoiceNo}</TableCell>
										<TableCell>{invoice.date.split('T')[0]}</TableCell>
										<TableCell>{invoice.rate}</TableCell>
										<TableCell>{invoice.totalHours}</TableCell>
										<TableCell>{invoice.amount}</TableCell>
										<TableCell>
											<a target='_blank' rel='noopener noreferrer' href={`${baseUrl}invoices/${invoice.invFile}`}>{invoice.invFile}</a>
										</TableCell>
									</TableRow>
								);
							})
							}
						</TableBody>
					</Table>
				) : (
					<p>No invoices available!</p>
				)
				}
				</TableContainer>
				
			</Box>
		</div>
	)
}
