import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { PlayArrow, PauseSharp, RestartAlt, Add } from '@mui/icons-material';
import { orange } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { clearInterval, setInterval } from 'worker-timers';

const useStyles = makeStyles({
	orangeButton: {
		backgroundColor: orange[500],
		color: 'white',
		'&:hover': {
			backgroundColor: orange[700],
		},
	}
});

export default function Stopwatch( props ) {
	const [time, setTime] = React.useState(0)
	const [isRunning, setIsRunning] = React.useState(false)

	React.useEffect(() => {
		if ( props.startingTime ) {
			let inMinutes = props.startingTime * 60
			setTime(inMinutes * 6000)
		}
	}, [])

	React.useEffect(() => {
		let intervalId = undefined;
		if ( isRunning ) {
			intervalId = setInterval(() => {
				setTime((time) => time + 1)
			}, 10)
		}

		return () => clearInterval(intervalId)
	}, [isRunning])

	// Hours calculation
	const hours = Math.floor(time / 360000)

	// Minutes calculation
	const minutes = Math.floor((time % 360000) / 6000)
  
	// Seconds calculation
	const seconds = Math.floor((time % 6000) / 100)
  
	// Milliseconds calculation
	const milliseconds = time % 100

	// Method to start and stop timer
	const startAndStop = ( e ) => {
		e.preventDefault();
		setIsRunning( !isRunning );
	};

	// Method to reset timer back to 0
	const reset = ( e ) => {
		e.preventDefault();
		if ( props.startingTime ) {
			let inMinutes = props.startingTime * 60
			setTime(inMinutes * 6000)
		} else {
			setTime(0);
		}
	};

	const handleAddToTask = ( e ) => {
		e.preventDefault();
		if ( isRunning ) {
			alert( 'Timer is running!! Stop it to add time to task.' )
		} else {
			// convert time to minutes
			let timeInMinutes = Math.floor( time / 6000 )
			if ( timeInMinutes > 0 ) {
				props.timerAddition( timeInMinutes )
			} else {
				alert( 'Add atleast 1 minute of work.' )
			}
		}
	}

	const classes = useStyles();

	return(
		<Box className="stopwatchContainer">
			<Typography component="h4" variant="h6">Add task hours using the timer below</Typography>
			<Typography className="stopwatchContainer__time" sx={{mt: 1}}>
				{hours}:{minutes.toString().padStart(2, "0")}:
				{seconds.toString().padStart(2, "0")}:
				{milliseconds.toString().padStart(2, "0")}
			</Typography>
			<Box className="stopwatchContainer__buttons" sx={{mt: 2}}>
				<Button variant="contained" onClick={startAndStop} startIcon={isRunning ? <PauseSharp /> : <PlayArrow />} className={classes.orangeButton}>
					{isRunning ? "Pause / Stop" : "Start"}
				</Button>
				<Button variant="contained" sx={{ml: 2}} color="error" onClick={reset} startIcon={<RestartAlt />}>
					Reset
				</Button>
				<Button variant="contained" sx={{ml: 2}} startIcon={<Add />} onClick={handleAddToTask}>
					Add to task
				</Button>
			</Box>
		</Box>
	)
}
