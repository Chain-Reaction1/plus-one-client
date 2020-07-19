import React from 'react'
import axios from 'axios'
import apiConfig from '../../apiConfig'
// import { Redirect } from 'react-router-dom'

class KickbackCreate extends React.Component {
  state = {
    kickback: {
      kickbackName: '',
      place: '',
      date: '',
      time: '',
      description: ''
    }
  }
  handleInputChange = (kickback) => {
    // get the kickback key from the input name field
    const kickbackKey = kickback.target.name
    // get the input value that the user typed in
    const value = kickback.target.value
    // make a copy of the current state
    const kickbackCopy = Object.assign({}, this.state.kickback)
    // update the copy with the new user input
    kickbackCopy[kickbackKey] = value
    // update the state with our updated copy
    this.setState({ kickback: kickbackCopy })
  }
  handleSubmit = (kickback) => {
    kickback.preventDefault()
    const { msgAlert, user } = this.props
    axios({
      method: 'POST',
      url: `${apiConfig}/kickbacks`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        kickback: this.state.kickback
      }

    })
      .then(() => msgAlert({
        heading: 'Event Create Succes',
        message: 'Message Success',
        variant: 'Success'
      }))
      .then(res => {
        this.setState({
          kickback: {
            kickbackName: '',
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
          <input onChange={this.handleInputChange} value={this.state.kickback.kickbackName} name="kickbackName" placeholder="Name" />
          <input onChange={this.handleInputChange} value={this.state.kickback.place} name="place" placeholder="Place" />
          <input onChange={this.handleInputChange} value={this.state.kickback.date} name="date" placeholder="Date" />
          <input onChange={this.handleInputChange} value={this.state.kickback.time} name="time" placeholder="Time" />
          <input onChange={this.handleInputChange} value={this.state.kickback.description} name="description" placeholder="Description" />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

export default KickbackCreate
