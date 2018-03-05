/* eslint-disable */
import React from 'react';
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import Players from './Players';
import Teams from './Teams';
import Team from './Team';
import Nav from './Nav';
import Home from './Home';
import axios from 'axios';

export default class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      players: [],
      teams: [],
      selectedTeam: {},
      selectedTeamPlayers: []
    }
    this.selectTeam = this.selectTeam.bind(this)
    this.teamPlayers = this.teamPlayers.bind(this)
  };

  componentWillMount() {
    axios.get('/api/players')
      .then( res => res.data)
      .then( players => this.setState({ players }))
    axios.get('/api/teams')
      .then(res => res.data)
      .then(teams => this.setState({ teams }))
  };

  selectTeam(teamId) {
    const selectedTeam = this.state.teams.find(team => team.id === teamId)
    this.teamPlayers(teamId)
    this.setState({ selectedTeam })
  }

  teamPlayers(teamId) {
    const players = this.state.players.filter( player => player.team.id === teamId)
    this.setState({ selectedTeamPlayers: players })
  }

  render() {
    const { players, teams, selectedTeam, selectedTeamPlayers } = this.state
    const { selectTeam } = this
    return (
      <Router>
        <div>
          <Route component={ Nav }/>
          <Route path='/' exact component={ Home } />
          <Route path='/players' exact render={() => (<Players players={players} />)} />
          <Route path='/teams' exact render={() => (<Teams teams={teams} selectTeam={selectTeam}/>)} />
          <Route path='/teams/:id' exact render={() => (<Team selectedTeam={selectedTeam} players={ selectedTeamPlayers }/>)} />
        </div>
      </Router>
    )
  }
}
