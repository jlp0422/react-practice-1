/* eslint-disable */
import React from 'react';

const Teams = ({ teams }) => {
  return (
    <div>
      <h1>Teams</h1>
      <ul>
      {
        teams &&
        teams.map( team => (
          <li key={ team.id }>
          {team.name}: {
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
