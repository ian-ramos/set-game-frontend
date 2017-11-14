import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
  return (
  <span>
    <h1>Set!</h1>
      <NavLink exact to='/user' >Profile</NavLink> |
      <NavLink exact to='/scores'> High Scores</NavLink> |
      <NavLink exact to='/game'> Play</NavLink> |
      <NavLink exact to='/multiplayer'> Multiplayer</NavLink> | 
      {localStorage.getItem('jwtToken') ? <NavLink exact to='/logout'> Logout</NavLink> : <NavLink exact to='/login'> Login</NavLink>}
      {!localStorage.getItem('jwtToken') ? <NavLink exact to='/signup'> | Signup</NavLink> : null}
  </span>
  )
}

NavBar.defaultProps = {

}

export default NavBar
