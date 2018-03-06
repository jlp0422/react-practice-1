/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const Teams = ({ teams, selectTeamAndPlayers }) => {
  return (
    <div>
      <h1>Teams</h1>
      <ul>
      {
        teams &&
        teams.map( team => (
          <li key={ team.id }>
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
