import React from "react";
import { Router } from "react-router-dom";
import { Container, Box, Link, Typography, Stack } from "@mui/material";

export default function Header() {
	return(
		<header className='app__header'>
			<Box>
				<Typography component="h1" variant="h3" sx={{textAlign: 'center'}}>My Timesheet App</Typography>
				<Stack direction="row" spacing={2}>
					<Link href="/timesheet">View All Timesheet</Link>
					<Link href="/invoices">View Invoices</Link>
				</Stack>
			</Box>
		</header>
	)
}
