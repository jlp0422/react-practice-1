/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: {},
      team: {},
      teammates: [],
      teams: [],
      newTeamId: ''
    }
    this.submitButton = this.submitButton.bind(this)
    this.onTeamChange = this.onTeamChange.bind(this)
  }

  submitButton(ev) {
    ev.preventDefault()
    const { player, newTeamId } = this.state
    const playerId = player.id*1
    const teamId = newTeamId*1
    this.props.onChangeTeam({ playerId, teamId })
  }

  onTeamChange(ev) {
    const newTeamId = ev.target.value
    this.setState({ newTeamId })
  }

  setPlayerInfo(players, teams, id) {
    const player = players.find( player => player.id === id)
    const teammates = players.filter( _player =>  _player.team.id === player.team.id && _player.id !== player.id)
    player && this.setState({ player, players, teams, teammates })
  }

  componentWillReceiveProps(nextProps) {
    this.setPlayerInfo(nextProps.players, nextProps.teams, nextProps.id*1)
  }

  componentDidMount() {
    this.setPlayerInfo(this.props.players, this.props.teams, this.props.id*1)
  }

  render() {
    const { player, team, teammates, teams, newTeamId } = this.state
    const { onTeamChange, submitButton } = this
    return (
      <div>
        <Helmet>
          <title>{`${player.name} | ${team.name}`}</title>
        </Helmet>
        <h1>{player.name}</h1>
        <h3>Team: {team.name}</h3>
        <h3>Teammates</h3>
        <ul>
          {
            teammates.length ? (
              teammates.map(teammate => (
                <li key={teammate.id}>{teammate.name}</li>
              ))
            ) : (
                <li>No teammates</li>
            )
          }
        </ul>
        <br />

        <form onSubmit={ submitButton }>
          <label>Change Team</label>
          {
            teams &&
            <select onChange={ onTeamChange } value={ newTeamId }>
              {
                teams.map(team => (
                  <option value={team.id} key={team.id}>{team.name}</option>
                ))
              }
            </select>
          }

          <button>Update</button>
        </form>

        <br />
        <p><Link to='/players'>&laquo; Back to all players</Link></p>
      </div>
    )
  }
}
