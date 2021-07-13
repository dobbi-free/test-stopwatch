import "./App.css";
import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import {interval} from "rxjs";
const observable$ = interval(1000)
function App() {
    const [time, setTime] = useState(21595);
    const [timerActive, setTimerActive] = useState(false);
    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerActive]);
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant={"h1"}>
                    {("0" + Math.floor((time / 21600) % 60)).slice(-2)}:
                </Typography>
                <Typography variant={"h1"}>
                    {("0" + Math.floor((time / 60) % 60)).slice(-2)}:
                </Typography>
                <Typography variant={"h1"}>{("0" + (time % 60)).slice(-2)}</Typography>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                xs={6}
            >
                <Grid container justifyContent="center" alignItems="center" xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => setTimerActive(true)}
                    >
                        Start
                    </Button>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" xs={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onDoubleClick={(e) => setTimerActive(false)}
                    >
                        Stop
                    </Button>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" xs={2}>
                    <Button variant="contained" onClick={(e) => setTime(0)}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
