import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import apiConfig from '../../apiConfig'

class KickbackIndex extends React.Component {
  state = {
    kickbacks: null
  }

  componentDidMount () {
    const { setKickbacks } = this.props
    axios.get(`${apiConfig}/kickbacks`)
      .then(response => {
        // handle success
        this.setState({
          kickbacks: response.data.kickbacks
        })
        setKickbacks(response.data.kickbacks)
      })
      .then(() => history.push('/'))
      .catch(error => {
        // handle error
        console.log(error)
      })
  }
  render () {
    let jsx
    // if the API has not responded yet
    if (this.state.kickbacks === null) {
      jsx = <p>Loading...</p>

    // if the API responds with no kickbacks
    } else if (this.state.kickbacks.length === 0) {
      jsx = <p>No events, please add an event</p>
    // if the API responds with events
    } else {
      jsx = (
        <ul>
          {this.state.kickbacks.map(kickback => {
            return (
              <li key={kickback._id}>
                <Link to={`/kickbacks/${kickback._id}`}>{kickback.kickbackName}</Link>
                <h4>{kickback.description}</h4>
                <h4>{kickback.date}</h4>
                <h4>{kickback.time}</h4>
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

export default KickbackIndex
