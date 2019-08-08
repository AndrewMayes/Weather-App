import React, { Component } from 'react'
import Form from './components/Form';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  state = {
    temperature: [],
    city: undefined,
    country: undefined,
    error: undefined,
    unit: 'I',
    precipitation: [],
    date: []
  }

  getWeather = (city, country) => {
    const unit = this.state.unit;
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${country}&key=${API_KEY}&days=7&units=${unit}`)
      .then(res => {
        const data = res.data;
        const days = data.data;
        const temp = [];
        const prec = [];
        const dates = [];
        //console.log(data);
        days.forEach(date => {
          temp.push(date.temp);
          prec.push(date.pop);
          dates.push(date.datetime)
        })

        this.setState({
          temperature: [...temp],
          city: data.city_name,
          country: data.country_code,
          error: '',
          precipitation: [...prec],
          date: [...dates]
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
          {this.state.error === '' && <p>{this.state.city}, {this.state.country}</p>}
        </div>
        {this.state.error === '' ? <Link to="/weather" style={{ textDecoration: 'none' }}><WeatherCard temp={this.state.temperature} city={this.state.city} country={this.state.country} unit={this.state.unit} onClick={this.moreWeather} precipitation={this.state.precipitation} date={this.state.date}/></Link> : <p>{this.state.error}</p>}
      </>     
    )
  }
}

const Home = () => {
  return (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
    </Switch>
  </Router>
  )
}

export default Home


