import React, { Component } from 'react'
import Form from './components/Form';
import axios from 'axios';

export default class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.main.temp,
          humidity: data.main.temp,
          description: data.weather[0].description,
          error: ''
        })
      })
      .catch(e => {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          description: undefined,
          error: 'wweewe'
        })
      })
  }

  render() {
    return (
      <div>
        <Form getWeather={this.getWeather}/>
        {this.state.temperature && <h1>Temp: {this.state.temperature}</h1>}
        {this.state.city && <h1>City: {this.state.city}</h1>}
        {this.state.country && <h1>Country: {this.state.country}</h1>}
        {this.state.description && <h1>Desc: {this.state.description}</h1>}
        {this.state.error && <h1>Error: {this.state.error}</h1>}
      </div>
    )
  }
}

