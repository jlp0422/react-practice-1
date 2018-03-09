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
      teammates: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const playerId = nextProps.id
    const player = nextProps.players.find( player => player.id === playerId*1)
    const team = player ? player.team : null
    const teammates = player ? nextProps.players.filter( _player => _player.team.id === player.team.id && _player.id !== player.id) : null
    player && team && teammates ? this.setState({ player, team, teammates }) : null
  }

  componentDidMount() {
    const { player, team, players } = this.props
    const teammates = players.filter(_player => _player.team.id === player.team.id && _player.id !== player.id)
    this.setState({ player, team, teammates })
  }

  render() {
    const { player, team, teammates } = this.state
    return ( <_Player player={ player } team={ team } teammates = {teammates} /> )
  }
}

const _Player = ({ player, team, teammates }) => {
  // const teammates = team.name ? team.players.filter(p => p.id !== player.id) : []
  return (
    <div>
      <Helmet>
        <title>{`${player.name} | ${team.name}`}</title>
      </Helmet>
      <h1>{ player.name}</h1>
      <h3>Team: { team.name }</h3>
      <h3>Teammates</h3>
      <ul>
        {
          teammates.length ? (
            teammates.map(teammate => (
              <li key={teammate.id}>{ teammate.name }</li>
            ))
          ) : (
            <li>No teammates</li>
          )
        }
      </ul>
      <br /><br />
      <p><Link to='/players'>&laquo; Back to all players</Link></p>
    </div>
  )
}
