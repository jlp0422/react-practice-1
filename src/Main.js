/* eslint-disable */
import React from 'react';
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Players from './Players';
import Player from './Player'
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
      selectedTeamPlayers: [],
      selectedPlayer: {},
    }
    this.selectTeamAndPlayers = this.selectTeamAndPlayers.bind(this)
    this.selectPlayerAndTeam = this.selectPlayerAndTeam.bind(this)
  };

  componentWillMount() {
    axios.get('/api/players')
      .then( res => res.data)
      .then( players => this.setState({ players }))
    axios.get('/api/teams')
      .then(res => res.data)
      .then(teams => this.setState({ teams }))
  };

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

  render() {
    const { players, teams, selectedTeam, selectedTeamPlayers, selectedPlayer } = this.state
    const { selectTeamAndPlayers, selectPlayerAndTeam } = this
    return (
      <Router>
        <div>
          <Route component={ Nav }/>

          <Route path='/' exact component={ Home } />

          <Route path='/players' exact render={() => (<Players players={players} selectPlayerAndTeam={ selectPlayerAndTeam }/>)} />

        {/*  <Route path='/players/:id' exact render={()=> {
            return (
              <div>
                <Helmet><title>Testing!!!</title></Helmet>
                <Player player={ selectedPlayer } team={ selectedTeam } />
              </div>
            )}} />
        */}

          <Route path='/players/:id' exact render={() => ( <Player player={selectedPlayer} team={selectedTeam} /> )} />

          <Route path='/teams' exact render={() => (<Teams teams={teams} selectTeamAndPlayers={ selectTeamAndPlayers }/>)} />

          <Route path='/teams/:id' exact render={() => (<Team selectedTeam={selectedTeam} players={ selectedTeamPlayers } selectTeamAndPlayers={ selectTeamAndPlayers }/> )} />

        </div>
      </Router>
    )
  }
}
