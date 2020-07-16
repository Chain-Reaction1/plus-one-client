import React from 'react'
import axios from 'axios'
import apiConfig from '../../apiConfig'
// import { Redirect } from 'react-router-dom'

class EventCreate extends React.Component {
  state = {
    event: {
      place: '',
      date: '',
      time: '',
      description: ''
    }
  }
  handleInputChange = (event) => {
    // get the event key from the input name field
    const eventKey = event.target.name
    // get the input value that the user typed in
    const value = event.target.value
    // make a copy of the current state
    const eventCopy = Object.assign({}, this.state.event)
    // update the copy with the new user input
    eventCopy[eventKey] = value
    // update the state with our updated copy
    this.setState({ event: eventCopy })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, user } = this.props
    axios({
      method: 'POST',
      url: `${apiConfig}/events`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        event: this.state.event
      }

    })
      .then(() => msgAlert({
        heading: 'Event Create Succes',
        message: 'Message Success',
        variant: 'Success'
      }))
      .then(res => {
        this.setState({
          event: {
            place: '',
            date: '',
            time: '',
            description: ''
          }
        })
      })

      .catch(console.error)
  }
  render () {
    return (
      <div>
        <h1>Create Event</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInputChange} value={this.state.event.place} name="place" placeholder="Place" />
          <input onChange={this.handleInputChange} value={this.state.event.date} name="date" placeholder="Date" />
          <input onChange={this.handleInputChange} value={this.state.event.time} name="time" placeholder="Time" />
          <input onChange={this.handleInputChange} value={this.state.event.description} name="description" placeholder="Description" />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

export default EventCreate
