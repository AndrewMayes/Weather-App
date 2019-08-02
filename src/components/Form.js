import React, { Component } from 'react'

export default class Form extends Component {

  state = {
    city: '',
    country: '',
    unit: ''
  }

  onSubmit = e => {
    e.preventDefault();

  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.props.getWeather}>
        <input type="text" name="city" value={this.state.city} onChange={this.onChange} placeholder="Enter City Name"/>
        <input type="text" name="country" value={this.state.country} onChange={this.onChange} placeholder="Enter Country Name"/>
        <button>Submit!</button>
      </form>
    )
  }
}

