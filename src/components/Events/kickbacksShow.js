import React from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'

class KickbackShow extends React.Component {
  state = {
    kickback: null,
    deleted: false
  }

  componentDidMount () {
    console.log('props are', this.props)
    console.log('match is', this.match)
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/kickbacks/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      // .then(() => msgAlert({
      //   heading: 'Event Show Success',
      //   message: 'Message Success',
      //   variant: 'Success'
      // }))
      .then(response => {
        console.log('this', response)
        // handle success
        this.setState({
          kickback: response.data.kickback
        })
      })
      .then(() => msgAlert({
        heading: 'Event Show Success',
        message: 'Message Success',
        variant: 'Success'
      }))
      .catch(error => {
        // handle error
        console.log(error)
      })
  }

  deleteKickback = () => {
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'DELETE',
      url: `${apiUrl}/kickbacks/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Event Delete Success',
        message: 'Message Success',
        variant: 'Success'
      }))
      .then(response => {
        this.setState({
          deleted: true
        })
      })
      .catch(console.error)
  }

  render () {
    const id = this.props.match.params.id
    if (this.state.deleted === true) {
      return <Redirect to='/kickbacks' />
    }

    let jsx
    // if the API has not responded yet
    if (this.state.kickback === null) {
      jsx = <p>Loading...</p>
    // after API responds
    } else {
      jsx = (
        <div>
          <h3>{this.state.kickback.kickbackName}</h3>
          <h4>{this.state.kickback.place}</h4>
          <h4>{this.state.kickback.date}</h4>
          <h4>{this.state.kickback.description}</h4>
          <h4>{this.state.kickback.time}</h4>
          <button onClick={this.deleteKickback}>Delete Event</button>
          <Link to={`/kickbacks/${id}/update`}>
            <button>Update Event</button>
          </Link>
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

export default KickbackShow
