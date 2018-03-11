/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

export default class Team extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      team: {},
      players: []
    }
    this.setTeamInfo = this.setTeamInfo.bind(this)
  }

  setTeamInfo(players, teams, id) {
    const team = teams.find( team => team.id === id)
    const _players = players.filter( player => player.team.id === id)
    team && this.setState({ team, players })
  }

  componentWillReceiveProps(nextProps) {
    this.setTeamInfo(nextProps.players, nextProps.teams, nextProps.id*1)
  }

  componentDidMount() {
    this.setTeamInfo(this.props.players, this.props.teams, this.props.id*1)
  }

  render() {
    const { players, team } = this.state
    return (
      <div>
        <Helmet>
          <title>{team.name}</title>
        </Helmet>
        {
          team &&
          <h1>{team.name}</h1>
        }

        <h3>Players</h3>
        <ul>
          {
            players.map(player => (
              <li key={player.id}>{player.name}</li>
            ))
          }
        </ul>
        <br /><br />
        <p><Link to='/teams'>&laquo; Back to all teams</Link></p>
      </div>
    )
  }
}
