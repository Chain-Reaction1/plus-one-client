import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class KickbackUpdate extends React.Component {
  state = {
    kickback: {
      kickbackName: '',
      place: '',
      date: '',
      time: '',
      description: ''
    },
    updated: false
  }
  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/kickbacks/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => this.setState({ kickback: res.data.kickback }))
      .catch(console.error)
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
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'PATCH',
      url: `${apiUrl}/kickbacks/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        kickback: this.state.kickback
      }
    })
      .then(response => {
        this.setState({
          updated: true,
          kickback: response.data.kickback
        })
      })
      .then(() => msgAlert({
        heading: 'Event Update Success',
        message: 'Message Success',
        variant: 'Success'
      }))
      .catch(console.error)
  }

  render () {
    const id = this.props.match.params.id

    if (this.state.updated) {
      return <Redirect to={`/kickbacks/${id}`} />
    }

    return (
      <div>
        <h1>Update Event</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInputChange} value={this.state.kickback.kickbackName} name="kickbackName" placeholder="Name" />
          <input onChange={this.handleInputChange} value={this.state.kickback.place} name="place" placeholder="Place" />
          <input onChange={this.handleInputChange} value={this.state.kickback.date} name="date" placeholder="Date" />
          <input onChange={this.handleInputChange} value={this.state.kickback.time} name="time" placeholder="Time" />
          <input onChange={this.handleInputChange} value={this.state.kickback.description} name="description" placeholder="Description" />
          <button type="submit">Save Update</button>
        </form>
      </div>
    )
  }
}

export default KickbackUpdate
