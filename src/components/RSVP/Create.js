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
    console.log(user)
    axios({
      method: 'POST',
      url: `${apiConfig}/kickbacks/${id}/rsvps`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        guest: user._id,
        name: user.name
      }
    })
      .then(res => {
        this.setState({
          rsvps: res.data.kickback.rsvps
        })
        console.log(res)
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
    const rsvpList = this.state.rsvps
    const uniqueList = [...new Set(rsvpList)]
    console.log(rsvpList)
    console.log(uniqueList)
    let jsx
    // if the API has not responded yet
    if (rsvpList === null) {
      jsx = <p>Loading...</p>

    // if the API responds with no kickbacks
    } else if (rsvpList.length === 0) {
      jsx = <p>No one has RSVPd to this event.</p>
    // if the API responds with events
    } else {
      jsx = (
        <ul>
          {rsvpList.map(rsvp => {
            if (rsvp !== null) {
              return (
                <li key={rsvp._id}>
                  <h4>{rsvp.name}</h4>
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
