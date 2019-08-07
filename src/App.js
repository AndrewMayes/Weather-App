import React, { Component } from 'react'
import Form from './components/Form';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './index.css';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class App extends Component {

  state = {
    temperature: [],
    city: undefined,
    country: undefined,
    error: undefined,
    unit: 'I'
  }

  getWeather = (city, country) => {
    const unit = this.state.unit;
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${country}&key=${API_KEY}&days=7&units=${unit}`)
      .then(res => {
        const data = res.data;
        const days = data.data;
        const temp = [];

        days.map(date => (
          temp.push(date.temp)
        ))

        this.setState({
          temperature: [...temp],
          city: data.city_name,
          country: data.country_code,
          error: ''
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

  render() {
    return (
      <>
        <div className="form">
          <Form getWeather={this.getWeather} setConversion={this.setConversion}/>
        </div>
        <div className="resultLocation">
          {this.state.error === '' && <p>{this.state.city}, {this.state.country}</p>}
        </div>
        {this.state.error === '' ? <WeatherCard temp={this.state.temperature} city={this.state.city} country={this.state.country} unit={this.state.unit} /> : <p>{this.state.error}</p>}
      </>     
    )
  }
}

