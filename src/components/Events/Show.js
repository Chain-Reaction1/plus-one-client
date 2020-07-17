import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import apiConfig from '../../apiConfig'

class EventShow extends React.Component {
  state = {
    event: null,
    deleted: false
  }
  componentDidMount () {
    const { msgAlert, user } = this.props
    const id = this.props.match.params.id
    axios({
      method: 'GET',
      url: `${apiConfig}/events/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Event Show Success',
        message: 'Message Success',
        variant: 'Success'
      }))
      .then(response => {
        // handle success
        this.setState({
          event: response.data.event
        })
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }

  deleteEvent = () => {
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'DELETE',
      url: `${apiConfig}/events/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
        .then(() => msgAlert({
          heading: 'Event Delete Success',
          message: 'Message Success',
          variant: 'Success'
        }))
    })

      .then(response => {
        this.setState({
          deleted: true
        })
      })
      .catch(console.error)
  }

  render () {
    if (this.state.deleted === true) {
      return <Redirect to='/events' />
    }

    let jsx
    // if the API has not responded yet
    if (this.state.event === null) {
      jsx = <p>Loading...</p>
    // after API responds
    } else {
      jsx = (
        <div>
          <h3>{this.state.event.place}</h3>
          <h4>{this.state.event.date}</h4>
          <h4>{this.state.event.description}</h4>
          <h4>{this.state.event.time}</h4>
          <button onClick={this.deleteEvent}>Delete event</button>
        </div>
      )
    }
    return (
      <div>
        <h2>Single Event Page</h2>
        {jsx}
      </div>
    )
  }
}

export default EventShow
