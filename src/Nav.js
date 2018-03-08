/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location }) => {
  const path = location.pathname
  return (
    <ul style={{marginTop: 15,marginBottom: 15}} className="nav nav-pills">
      <li className="nav-item">
        {
         path === '/' ? (
           <span className="nav-link active font-weight-bold">Home</span>
         ) : (
           <Link className="nav-link font-weight-bold" to='/'>Home</Link>
         )
        }
      </li>
      <li className="nav-item">
        {
         path.match(/players/) ? (
           <span className="nav-link active font-weight-bold">Players</span>
         ) : (
           <Link className="nav-link font-weight-bold" to='/players'>Players</Link>
         )
        }
      </li>
      <li className="nav-item">
        {
         path.match(/teams/) ? (
           <span className="nav-link active font-weight-bold">Teams</span>
         ) : (
           <Link className="nav-link font-weight-bold" to='/teams'>Teams</Link>
         )
        }
      </li>
      <li className="nav-item">
        {
          path === '/team/create' ? (
            <span className="nav-link active font-weight-bold">Create Team</span>
          ) : (
            <Link className="nav-link font-weight-bold" to='/team/create'>Create Team</Link>
          )
        }
      </li>

    </ul>
  )
}

export default Nav;
