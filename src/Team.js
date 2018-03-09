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
  }

  componentWillReceiveProps(nextProps) {
    const team = nextProps.teams.find( team => team.id === nextProps.id*1)
    const players = nextProps.players.filter( player => player.team.id === nextProps.id*1)
    players && team ? this.setState({ team, players }) : null
  }

  componentDidMount() {
    const players = this.props.players.filter( player => player.team.id === this.props.id*1)
    const { team } = this.props
    players && team ? this.setState({ players, team }) : null
  }

  render() {
    const { players, team } = this.state
    return (<_Team  players={ players } selectedTeam={ team } />);
  }
}


const _Team = ({ players, selectedTeam}) => {
  return (
    <div>
      <Helmet>
        <title>{ selectedTeam.name }</title>
      </Helmet>
      {
        selectedTeam &&
        <h1>{selectedTeam.name}</h1>
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
