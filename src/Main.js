/* eslint-disable */
import React from 'react';
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Players from './Players';
import Player from './Player'
import Teams from './Teams';
import Team from './Team';
import FormContainer from './FormContainer'
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
      selectedTeamPlayers: [],
      selectedPlayer: {},
    }
    this.selectTeamAndPlayers = this.selectTeamAndPlayers.bind(this)
    this.selectPlayerAndTeam = this.selectPlayerAndTeam.bind(this)
    this.onCreateTeam = this.onCreateTeam.bind(this)
  };

  componentDidMount() {
    axios.get('/api/players')
      .then( res => res.data)
      .then( players => this.setState({ players }))
    axios.get('/api/teams')
      .then(res => res.data)
      .then(teams => this.setState({ teams }))
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  selectTeamAndPlayers(teamId) {
    const selectedTeam = this.state.teams.find(team => team.id === teamId)
    const selectedTeamPlayers = this.state.players.filter(player => player.team.id === teamId)
    this.setState({ selectedTeam, selectedTeamPlayers })
  }

  selectPlayerAndTeam(playerId, teamId) {
    const selectedPlayer = this.state.players.find(p => p.id === playerId)
    const selectedTeam = this.state.teams.find(team => team.id === teamId)
    this.setState({ selectedPlayer, selectedTeam })
  }

  onCreateTeam(team) {
    axios.post('/api/teams', (team))
      .then( res => res.data)
      .then( team => {
        const teams = [...this.state.teams, team];
        this.setState({ teams })
      })
      .then(this.setState({ name: '' }))
  }

  render() {
    const { players, teams, selectedTeam, selectedTeamPlayers, selectedPlayer } = this.state
    const { selectTeamAndPlayers, selectPlayerAndTeam, onCreateTeam } = this
    return (
      <Router>
        <div>
          <Route component={ Nav }/>

          <Route path='/' exact component={ Home } />

          <Route path='/players' exact render={() => (<Players players={players} selectPlayerAndTeam={ selectPlayerAndTeam }/>)} />

          <Route path='/players/:id' exact render={({ match }) => ( <Player id={match.params.id} /> )} />

          <Route path='/teams' exact render={() => (<Teams teams={teams} selectTeamAndPlayers={ selectTeamAndPlayers }/>)} />

          <Route path='/teams/:id' exact render={({ match }) => (<Team selectedTeam={selectedTeam} players={selectedTeamPlayers} id={match.params.id} selectTeamAndPlayers={ selectTeamAndPlayers }/> )} />

          <Route path='/team/create' exact render={() => <FormContainer teams={ teams } onCreateTeam={ onCreateTeam} />} />

        </div>
      </Router>
    )
  }
}
