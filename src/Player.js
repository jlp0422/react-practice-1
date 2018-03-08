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

  componentWillMount() {
    axios.get('/api/players')
      .then( res => res.data)
      .then( players => players.find(player => player.id === this.props.id*1))
      .then( player => this.setState({ player: player, team: player.team}))
      .then(() => {
        const { player, team } = this.state
        axios.get('/api/teams')
          .then(res => res.data)
          .then(teams => teams.find(_team => _team.id === team.id))
          .then(team => team.players.filter(_player => _player.id !== player.id))
          .then(teammates => this.setState({ teammates }))
      })
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
