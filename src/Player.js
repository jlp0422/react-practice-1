import React from 'react';

const Player = ({ player, team }) => {
  const teammates = team.name ? team.players.filter(p => p.id !== player.id) : []
  return (
    <div>
      <h1>{ player.name}</h1>
      <h3>Team: { team.name }</h3>
      <h3>Teammates</h3>
      <ul>
        {
          teammates.length > 0 ? (
            teammates.map(teammate => (
              <li key={teammate.id}>{ teammate.name }</li>
            ))
          ) : (
            <li>No teammates</li>
          )

        }
      </ul>
    </div>
  )
}

export default Player;
