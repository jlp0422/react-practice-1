/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// class Team extends React.Component {
//   constructor(props) {
//     super(props)
//     const { selectTeamAndPlayers, id } = this.props
//   }

//   componentWillMount(){
//     const { selectTeamAndPlayers, id } = this.props
//     console.log(selectTeamAndPlayers)
//     console.log(id)
//   }
//   render() {
//     // console.log(this)
//     return (<_Team selectedTeam={ selectTeamAndPlayers(id) } players={ this.props.players } />);
//   }
// }


const Team = ({ players, selectedTeam}) => {
  return (
    <div>
      <Helmet>
        <title>Title</title>
      </Helmet>
      {
        selectedTeam &&
        <h1>{selectedTeam.name}</h1>
      }

      <h3>Players</h3>
      <ul>
        {
          players.map(player => (
            <li key={player.id}>{player.name}</li>
          ))
        }
      </ul>
      <br /><br />
      <p><Link to='/teams'>&laquo; Back to all teams</Link></p>
    </div>
  )
}

export default Team;
