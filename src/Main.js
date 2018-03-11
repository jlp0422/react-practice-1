/* eslint-disable */
import React from 'react';
import { Route, HashRouter as Router, Link, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Players from './Players';
import Player from './Player'
import Teams from './Teams';
import Team from './Team';
import CreateTeam from './CreateTeam'
import CreatePlayer from './CreatePlayer'
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
    this.onCreatePlayer = this.onCreatePlayer.bind(this)
    this.onChangeTeam = this.onChangeTeam.bind(this)
  };

  componentDidMount() {
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

  onCreateTeam(team) {
    axios.post('/api/teams', team)
      .then( res => res.data)
      .then( team => {
        const teams = [...this.state.teams, team];
        this.setState({ teams })
      })
      .then(this.setState({ name: '' }))
      .then(() => document.location.hash = '/teams')

  }

  onCreatePlayer(player) {
    axios.post('/api/players', player)
      .then( res => res.data)
      .then( player => {
        const players = [...this.state.players, player];
        this.setState({ players })
      })
      .then(this.setState({
        name: '',
        teamId: ''
      }))
      .then(() => {
        axios.get('/api/teams')
          .then(res => res.data)
          .then( teams => this.setState({ teams }))
      })
      .then(() => document.location.hash = '/players')
  }

  onChangeTeam(player) {
    axios.put(`/api/players/${player.id}`, player)
      .then( res => res.data)
      .then( player => {
        const players = this.state.players.filter( _player => _player.id !== player.id)
        const playerTeam = this.state.teams.find( team => team.id === player.teamId*1)
        player.team = playerTeam
        this.setState({ players: [...players, player]})
        console.log(this.state.teams)
      })
      .then(() => document.location.hash = '/players')
  }

  render() {
    const { players, teams, selectedTeam, selectedTeamPlayers, selectedPlayer } = this.state
    const { selectTeamAndPlayers, selectPlayerAndTeam, onCreateTeam, onCreatePlayer, onChangeTeam } = this
    return (
      <Router>
        <div>
          <Route component={ Nav }/>
          <Switch>

            <Route path='/' exact component={ Home } />

            <Route path='/players/create' exact render={() => (
              <CreatePlayer
                teams={teams}
                players={players}
                onCreatePlayer={onCreatePlayer} />
            )} />

            <Route path='/players/:id' exact render={({ match }) => (
              <Player
                id={ match.params.id }
                player={ selectedPlayer }
                team={ selectedTeam }
                players={ players }
                teams={ teams }
                onChangeTeam={ onChangeTeam }/>
            )} />

            <Route path='/players' exact render={() => (
              <Players
                players={ players }
                selectPlayerAndTeam={ selectPlayerAndTeam }/>
            )} />

            <Route path='/teams/create' exact render={() => (
              <CreateTeam
                teams={ teams }
                onCreateTeam={ onCreateTeam } />
            )} />

            <Route path='/teams/:id' exact render={({ match }) => (
              <Team
                id={ match.params.id }
                players={ players }
                team={ selectedTeam }
                teams={ teams } />
              )} />

            <Route path='/teams' exact render={() => (
              <Teams
                teams={ teams }
                selectTeamAndPlayers={ selectTeamAndPlayers }/>
              )} />

          </Switch>

        </div>
      </Router>
    )
  }
}
