/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const Players = ({ players, selectPlayerAndTeam }) => {
  return (
    <div>
      <h1>Players</h1>
      <ul>
        {
          players &&
          players.map( player => (
            <li key={ player.id }>
            <Link onClick={() => selectPlayerAndTeam(player.id, player.team.id) }to={`players/${player.id}`}>{ player.name } </Link>
            ({player.team.name})</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Players;
