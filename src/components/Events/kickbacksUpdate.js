import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

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
        message: messages.kickbacksUpdateSuccess,
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
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h1>Create Event</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="kickbackName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="kickbackName"
                value={this.state.kickback.kickbackName}
                placeholder="Enter event name"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="place">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type="text"
                name="place"
                value={this.state.kickback.place}
                placeholder="Location"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="date"
                value={this.state.kickback.date}
                placeholder="Date"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control
                required
                type="time"
                name="time"
                value={this.state.kickback.time}
                placeholder="Time"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Event Description</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                value={this.state.kickback.description}
                placeholder="What are you doing?"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default KickbackUpdate
