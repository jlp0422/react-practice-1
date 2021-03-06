/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Players = ({ players, selectPlayerAndTeam }) => {
  return (
    <div>
      <Helmet>
        <title>Players</title>
      </Helmet>
      <h1>Players</h1>
      <ul className="list-group">
        {
          players &&
          players.map( player => (
            <li className="list-group-item" key={ player.id }>
            <Link onClick={() => selectPlayerAndTeam(player.id, player.team.id) }to={`players/${player.id}`}>{ player.name } </Link>
            ({player.team.name})</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Players;
