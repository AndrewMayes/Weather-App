import React, { Component } from 'react'
import Form from './components/Form';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './index.css';

export default class App extends Component {

  state = {
    temperature: [],
    city: undefined,
    country: undefined,
    error: undefined
  }

  getWeather = e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${country}&key=${API_KEY}&days=7`)
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

  render() {
    return (
      <>
        <div className="form">
          <Form getWeather={this.getWeather}/>
        </div>
        {this.state.city && <WeatherCard temp={this.state.temperature} city={this.state.city} country={this.state.country} />}
      </>     
    )
  }
}

