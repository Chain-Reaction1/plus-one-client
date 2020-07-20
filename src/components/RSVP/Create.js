import React from 'react'
import axios from 'axios'
import apiConfig from '../../apiConfig'
// import { Redirect } from 'react-router-dom'

class RsvpCreate extends React.Component {
  state = {
    rsvps: []
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'POST',
      url: `${apiConfig}/kickbacks/${id}/rsvps`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        guest: user._id
      }
    })
      .then(res => {
        this.setState({
          rsvps: res.data.kickback.rsvps
        })
      })
      .then(() => msgAlert({
        heading: 'RSVP Success',
        message: 'Message Success',
        variant: 'Success'
      }))

      .catch(console.error)
  }
  render () {
    console.log(this.state)
    let jsx
    // if the API has not responded yet
    if (this.state.rsvps === null) {
      jsx = <p>Loading...</p>

    // if the API responds with no kickbacks
    } else if (this.state.rsvps.length === 0) {
      jsx = <p>No one has RSVPd to this event.</p>
    // if the API responds with events
    } else {
      jsx = (
        <ul>
          {this.state.rsvps.map(user => {
            if (user !== null) {
              return (
                <li key={user._id}>
                  <h4>{user._id}</h4>
                </li>
              )
            }
          })}
        </ul>
      )
    }
    return (
      <div>
        <h1>Exclusive RSVP list:</h1>
        <h3>{jsx}</h3>
      </div>
    )
  }
}

export default RsvpCreate
