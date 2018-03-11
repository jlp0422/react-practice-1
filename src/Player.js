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
      newTeam: {}
    }
    this.submitButton = this.submitButton.bind(this)
    this.onTeamChange = this.onTeamChange.bind(this)
    this.setPlayerInfo = this.setPlayerInfo.bind(this)
  }

  submitButton(ev) {
    ev.preventDefault()
    this.props.onChangeTeam({ id: this.props.id, newTeam: this.state.newTeam })
  }

  onTeamChange(ev) {
    const newTeamId = ev.target.value
    const newTeam = this.state.teams.find(team => team.id === newTeamId*1)
    this.setState({ newTeam })
  }

  setPlayerInfo(players, teams, id) {
    const player = players.find( player => player.id === id)
    const team = player && teams.find( team => player.teamId === team.id)
    const teammates = player && players.filter( _player =>  _player.team.id === player.team.id && _player.id !== player.id)
    player && team && this.setState({ player, players, teams, teammates, team, newTeam: player.team })
  }

  componentWillReceiveProps(nextProps) {
    this.setPlayerInfo(nextProps.players, nextProps.teams, nextProps.id*1)
  }

  componentDidMount() {
    this.setPlayerInfo(this.props.players, this.props.teams, this.props.id*1)
  }

  render() {
    const { player, team, teammates, teams, newTeam } = this.state
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
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="font-weight-bold">Change Team</label>
              {
                teams &&
                <select className="form-control" onChange={ onTeamChange } value={ newTeam.id }>
                  {
                    teams.map(team => (
                      <option value={team.id} key={team.id}>{team.name}</option>
                    ))
                  }
                </select>
              }
            </div>
          </div>
          <button className="btn btn-outline-success">Update</button>
        </form>

        <br />
        <p><Link to='/players'>&laquo; Back to all players</Link></p>
      </div>
    )
  }
}
