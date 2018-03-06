import React from 'react';
import { Helmet } from 'react-helmet';

const Player = ({ player, team }) => {
  const teammates = team.name ? team.players.filter(p => p.id !== player.id) : []
  return (
    <div>
      <Helmet>
        <title>{player.name}</title>
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
            <li>None</li>
          )

        }
      </ul>
    </div>
  )
}

export default Player;
