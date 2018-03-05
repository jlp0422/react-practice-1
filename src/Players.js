/* eslint-disable */
import React from 'react';

const Players = ({ players }) => {
  return (
    <div>
      <h1>Players</h1>
      <ul>
        {
          players &&
          players.map( player => (
            <li key={ player.id }>{ player.name } ({player.team.name})</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Players;
