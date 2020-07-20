import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import KickbackCreate from '../Events/kickbacksCreate'
import KickbackShow from '../Events/kickbacksShow'
import KickbackIndex from '../Events/kickbacksIndex'
import KickbackUpdate from '../Events/kickbacksUpdate'
import RsvpCreate from '../RSVP/Create'

class App extends Component {
  constructor () {
    super()

    this.state = {
      kickbacks: [],
      user: null,
      msgAlerts: []
    }
  }
  setUser = user => this.setState({ user })
  setKickbacks = kickbacks => this.setState({ kickbacks: kickbacks })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/kickback-create' render={() => (
            <KickbackCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/kickbacks/:id' render={({ match }) => {
            this.state.kickbacks.find(kickback => kickback.id === match.params.id)
            return <KickbackShow msgAlert={this.msgAlert} match={match} user={user} />
          }} />
          <Route exact path='/kickbacks' render={() => (
            <KickbackIndex msgAlert={this.msgAlert} setKickbacks={this.setKickbacks} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/kickbacks/:id/update' render={({ match }) => (
            <KickbackUpdate msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/kickbacks/:id/rsvp' render={({ match }) => (
            <RsvpCreate msgAlert={this.msgAlert} match={match} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
