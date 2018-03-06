/* eslint-disable */
import React from 'react';

const Team = ({ selectedTeam, players, selectTeamAndPlayers }) => {
  // const teamId = location.hash.substring(location.hash.length - 1)
  // console.log(selectedTeam)
  return (
    <div>
      <h1>{selectedTeam.name}</h1>
      <h3>Players</h3>
      <ul>
        {
          players.map(player => (
            <li key={player.id}>{player.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Team;
