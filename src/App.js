import "./App.css";
import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { interval, scan, startWith } from "rxjs";

const stream$ = interval(1000);
function App() {
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);


  const start = () => {
    setTimerActive(true)

  };

  const stop = () => {
    setTimerActive(false)
  };

  const resetTimer = () => {
    setTime(0)
  };

  useEffect(() => {
    if (timerActive) {
      const sub = stream$.pipe(
          startWith(time),
          scan(value => value + 1),
      ).subscribe(setTime)
      return () => sub.unsubscribe();
    }
  }, [timerActive,time]);
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
            onClick={start}
          >
            Start
          </Button>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" xs={2}>
          <Button
            variant="contained"
            color="secondary"
            onDoubleClick={stop}
          >
            Wait
          </Button>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" xs={2}>
          <Button variant="contained" onClick={resetTimer}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
