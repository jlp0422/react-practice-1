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
      teams: []
    }
    this.submitButton = this.submitButton.bind(this)
  }

  submitButton(ev) {
    ev.preventDefault()
    const { name, teamId } = this.state
    this.props.onCreatePlayer({ name, teamId })
  }

  componentWillReceiveProps(nextProps) {
    const playerId = nextProps.id
    const { teams } = nextProps
    const player = nextProps.players.find( player => player.id === playerId*1)
    const team = player ? player.team : null
    const teammates = player ? nextProps.players.filter( _player => _player.team.id === player.team.id && _player.id !== player.id) : null
    player && team && teammates ? this.setState({ player, team, teammates, teams }) : null
  }

  componentDidMount() {
    const { player, team, players, teams } = this.props
    const teammates = players.filter(_player => _player.team.id === player.team.id && _player.id !== player.id)
    this.setState({ player, team, teammates, teams })
  }

  render() {
    const { player, team, teammates, teams } = this.state
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

      {/*  <form>
          <label>Change Team</label>
          {
            teams &&
            <select value={team.id}>
              {
                teams.map(team => (
                  <option value={team.id} key={team.id}>{team.name}</option>
                ))
              }
            </select>
          }

          <button>Update</button>
        </form>
      */ }
        <br />
        <p><Link to='/players'>&laquo; Back to all players</Link></p>
      </div>
    )
  }
}
