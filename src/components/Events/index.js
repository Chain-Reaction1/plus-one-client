import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import apiConfig from '../../apiConfig'

class EventIndex extends React.Component {
  state = {
    events: null
  }

  componentDidMount () {
    axios.get(`${apiConfig}/events`)
      .then(response => {
        // handle success
        this.setState({
          events: response.data.events
        })
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }
  render () {
    let jsx
    // if the API has not responded yet
    if (this.state.events === null) {
      jsx = <p>Loading...</p>

    // if the API responds with no events
    } else if (this.state.events.length === 0) {
      jsx = <p>No events, please add a event</p>
    // if the API responds with events
    } else {
      jsx = (
        <ul>
          {this.state.events.map(event => {
            return (
              <li key={event._id}>
                <Link to={`/events/${event._id}`}>{event.title}</Link>
              </li>
            )
          })}
        </ul>
      )
    }

    return (
      <div>
        <h2>Events Page</h2>
        {jsx}
      </div>
    )
  }
}

export default EventIndex
