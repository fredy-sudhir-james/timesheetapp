import React from "react";
import { Box, Drawer, Typography, AppBar, Toolbar, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, TableChart, Receipt, Menu } from '@mui/icons-material';
import { red, lightGreen, green } from '@mui/material/colors';

export default function Header( { drawerWidth }) {
	const [ mobileOpen, setMobileOpen ] = React.useState( false );
	const [ isClosing, setIsClosing ] = React.useState( false );

	console.log( 'Header rendered' );

	const handleDrawerClose = () => {
		setIsClosing( true );
		setMobileOpen( false );
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing( false );
	};

	const handleDrawerToggle = () => {
		if ( !isClosing ) {
			setMobileOpen( !mobileOpen );
		}
	};

	const drawer = (
		<div>
			<Toolbar />
			<List>
				<ListItem disablePadding>
					<ListItemButton component="a" href='/'>
						<ListItemIcon sx={{color: lightGreen[200]}}><Dashboard /></ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton component="a" href='/timesheet'>
						<ListItemIcon sx={ { color: lightGreen[ 200 ] } }><TableChart /></ListItemIcon>
						<ListItemText primary="Timesheet" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton component="a" href='/allinvoices'>
						<ListItemIcon sx={ { color: lightGreen[ 200 ] } }><Receipt /></ListItemIcon>
						<ListItemText primary="Invoices" />
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	)

	return(
		<header className='app__header'>
			<AppBar
				position="fixed"
				sx={ {
					width: { sm: `calc(100% - ${ drawerWidth }px)` },
					ml: { sm: `${ drawerWidth }px` },
					bgcolor: green[500]
				} }
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={ handleDrawerToggle }
						sx={ { mr: 2, display: { sm: 'none' } } }
					>
						<Menu />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Timesheet App
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={ { width: { sm: drawerWidth }, flexShrink: { sm: 0 } } }
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */ }
				<Drawer
					variant="temporary"
					open={ mobileOpen }
					onTransitionEnd={ handleDrawerTransitionEnd }
					onClose={ handleDrawerClose }
					ModalProps={ {
						keepMounted: true, // Better open performance on mobile.
					} }
					sx={ {
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					} }
				>
					{ drawer }
				</Drawer>
				<Drawer
					variant="permanent"
					sx={ {
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					} }
					open
				>
					{ drawer }
				</Drawer>
			</Box>
		</header>
	)
}
