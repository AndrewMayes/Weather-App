import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Form extends Component {

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
        <input type="text" name="city" value={this.state.city} onChange={this.onChange} placeholder="Enter City Name"/>
        <input type="text" name="country" value={this.state.country} onChange={this.onChange} placeholder="Enter Country Name"/>
        <button>Submit!</button>
      </form>
      <FormGroup>
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




/*
export default function CustomizedSwitches() {
  const [state, setState] = React.useState({
    checkedC: true
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <Switch
              checked={state.checkedC}
              onChange={handleChange('checkedC')}
              value="checkedC"
            />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
*/
