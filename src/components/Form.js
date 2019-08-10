import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


//Material-UI Reddit form input styles
const useStylesReddit = makeStyles(theme => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

//Material-UI Reddit form input
function RedditTextField(props) {
  const classes = useStylesReddit();

  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

export default class Form extends Component {

  useStyles = makeStyles(theme => ({
    redForm: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: 10,
    },
  }));

  state = {
    city: '',
    country: '',
    unit: false
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.getWeather(this.state.city, this.state.country);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChange = name => event => {
    this.props.setConversion(this.state.unit);
    this.setState({
      [name]: event.target.checked
    });
  };

  render() {
    return (
      <>
      <form onSubmit={this.onSubmit}>
        <div className={this.useStyles.redForm}>
          <RedditTextField
            label="City Name"
            className={this.useStyles.margin}
            variant="filled"
            id="reddit-input"
            onChange={this.onChange}
            value={this.state.city}
            name="city"
          />
          <RedditTextField
            label="Country Name"
            className={this.useStyles.margin}
            variant="filled"
            id="reddit-input"
            onChange={this.onChange}
            value={this.state.country}
            name="country"
          />
          </div>
          <div className="centerButton">
            <Button variant="contained" type="submit" className={this.useStyles.button}>Submit</Button>
          </div>
      </form>
      <FormGroup className="centerButton">
          <Typography component="div">
            <Grid  container alignItems="center" spacing={1}>
              <Grid item>F</Grid>
              <Grid item>
              <Switch
                value="unit"
                onChange={this.handleChange('unit')}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              </Grid>
              <Grid item>C</Grid>
            </Grid>
          </Typography>
        </FormGroup>
      </>
    )
  }
}
