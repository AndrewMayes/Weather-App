import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import weatherImg from '../imgs/partly_cloudy.png';

const useStyles = makeStyles(theme => ({
  paper: {
    height: 250,
    width: 190,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '& p': {
      padding: 5,
      paddingTop: 10,
      fontSize: 30
    } 
  }
}));

const Weather = ({temp, city, country}) => {
  const classes = useStyles();
  const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {days.map((day, index) => (
              <Grid key={day} item>
                <Paper className={classes.paper}>
                  <p>{day}</p>
                  <img src={weatherImg} alt="weather" />
                  <p>{temp[index]} &#176;</p>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid> 
  )
}

export default Weather
