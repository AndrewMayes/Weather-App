import React, { Component } from 'react'
import Form from './components/Form';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import IndividualDay from './components/IndividualDay';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  state = {
    temperature: [],
    city: undefined,
    country: undefined,
    error: undefined,
    unit: 'I',
    rain: [],
    date: [],
    state: undefined,
    snow: []
  }

  getWeather = (city, country) => {
    const unit = this.state.unit;
    const searchCountry = country.toUpperCase();
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${searchCountry}&key=${API_KEY}&days=7&units=${unit}`)
      .then(res => {
        const data = res.data;
        const days = data.data;
        const temp = [];
        const rain = [];
        const dates = [];
        const snow = [];
        console.log(data);
        days.forEach(date => {
          temp.push(date.temp);
          rain.push(date.pop);
          dates.push(date.datetime);
          snow.push(date.snow);
        })

        this.setState({
          temperature: [...temp],
          city: data.city_name,
          country: data.country_code,
          error: '',
          rain: [...rain],
          date: [...dates],
          state: data.state_code,
          snow: [...snow]
        })
      })
      .catch(e => {
        this.setState({
          temperature: [],
          city: undefined,
          country: undefined,
          error: 'Location could not be found.'
        })
      })
  }

  convertToF = (celsius) => {
    return ((celsius * 9/5) + 32);
  }

  convertToC = (fahrenheit) => {
    return ((fahrenheit - 32) * (5/9));
  }

  setConversion = (unit) => {
    const temp = this.state.temperature;
    const newTemps = [];
    let currentUnit = '';
    
    if (unit) {
      temp.map(day => (
        newTemps.push(this.convertToF(day).toFixed(1))
      ))
    } else {
      temp.map(day => (
        newTemps.push(this.convertToC(day).toFixed(1))
      ))
    }
    
    unit ? (currentUnit = 'I') : (currentUnit = 'M')

    this.setState({
      temperature: [...newTemps],
      unit: currentUnit
    })
  }

  moreWeather = () => {
    console.log('more weather here');
  }

  render() {
    return (
      <>
        <div className="form">
          <Form getWeather={this.getWeather} setConversion={this.setConversion}/>
        </div>
        <div className="resultLocation">
          {/*Print state if country is US. Print country otherwise*/}
          {(this.state.error === '' && this.state.country === 'US') ? <Paper><p style={{padding: 5}}>{this.state.city}, {this.state.state}</p></Paper> : this.state.error === '' && <Paper><p style={{padding: 5}}>{this.state.city}, {this.state.country}</p></Paper>}
        </div>
        {this.state.error === '' ? <WeatherCard temp={this.state.temperature} city={this.state.city} country={this.state.country} unit={this.state.unit} onClick={this.moreWeather} rain={this.state.rain} date={this.state.date} snow={this.state.snow}/> : <p>{this.state.error}</p>}
      </>     
    )
  }
}

const Home = () => {
  return (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/:day" render={(props) => <IndividualDay {...props} />}/>
    </Switch>
  </Router>
  )
}

export default Home


