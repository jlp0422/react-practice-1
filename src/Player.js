/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// export default class Player extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }
//   render() {
//     console.log(props)
//     return (
//       <div>
//         <Helmet>
//           <title>{player.name}</title>
//         </Helmet>
//         <h1>{player.name}</h1>
//         <h3>Team: {team.name}</h3>
//         <h3>Teammates</h3>
//         <ul>
//           {
//             teammates.length ? (
//               teammates.map(teammate => (
//                 <li key={teammate.id}>{teammate.name}</li>
//               ))
//             ) : (
//                 <li>None</li>
//               )

//           }
//         </ul>
//       </div>
//     )
//   }
// }


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
            <li>No teammates</li>
          )
        }
      </ul>
      <br /><br />
      <p><Link to='/players'>&laquo; Back to all players</Link></p>
    </div>
  )
}

export default Player;
