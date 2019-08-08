import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import sunnyImg from '../imgs/sunny.svg';
import rainyImg from '../imgs/rainy.svg';

const useStyles = makeStyles(theme => ({
  paper: {
    height: 250,
    width: 190,
    textAlign: 'center',
    color: 'black',
    '& p': {
      padding: 5,
      paddingTop: 10,
      fontSize: 30
    },
    cursor: 'pointer'
  }
}));

const Weather = ({temp, city, country, unit, onClick, precipitation, date}) => {
  const classes = useStyles();
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

  //Ensures the days of the week order starts at the current day
  const setStartingDate = (days) => {
    const day = new Date();
    const currentDay = day.getDay();
    const newDays = [];
    for( let i=0; i < days.length; i++) {
      let pointer = (i + currentDay) % days.length;
      newDays.push(days[pointer]);
    }
    return newDays;
  } 

  //Uses probability of precipitation to determine which image to display for each weather card
  const prec = (precipitation) => {
    if (precipitation > 30) {
      return (<img src={rainyImg} alt="rainy" />)
    } else {
      return (<img src={sunnyImg} alt="sunny" />)
    }
  }

  return (
      <Grid container spacing={0} alignItems="center" justify="center" onClick={onClick}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {days.map((day, index) => (
              <Grid key={day} item>
                <Paper className={classes.paper}>
                  <p>{setStartingDate(days)[index]}</p>
                  {prec(precipitation[index])}
                  <p>{temp[index]} &#176; {(unit === 'I') ? 'F' : 'C'}</p>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid> 
  )
}

export default Weather
