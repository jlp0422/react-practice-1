/* eslint-disable */
import React from 'react';
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import Players from './Players';
import Teams from './Teams';
import Nav from './Nav'
import axios from 'axios'

export default class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      players: [],
      teams: []
    }
  }

  componentWillMount() {
    axios.get('/api/players')
      .then( res => res.data)
      .then( players => this.setState({ players }))
    axios.get('/api/teams')
      .then(res => res.data)
      .then(teams => this.setState({ teams }))
  }

  render() {
    const { players, teams } = this.state
    return (
      // <Router>
        <div>
          <Nav />
          <Players players={ players } />
          <Teams teams={ teams } />
        </div>
      // </Router>
    )
  }
}
