/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Teams = ({ teams, selectTeamAndPlayers }) => {
  return (
    <div>
    <Helmet>
      <title>Teams</title>
    </Helmet>
      <h1>Teams</h1>
      <ul className="list-group">
      {
        teams &&
        teams.map( team => (
          <li className="list-group-item" key={ team.id }>
          <Link onClick={() => selectTeamAndPlayers(team.id)} to={`/teams/${team.id}`}>{team.name}</Link>: {
            team.players.length === 1 ? (
              `${team.players.length} player`
            ) : (
              `${team.players.length} players`
            )
          }
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default Teams;
