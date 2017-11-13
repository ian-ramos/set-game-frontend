import React from 'react';
import { Redirect } from 'react-router-dom';

const LogoutComponent = (props) => {
  props.onLogout()
  return (
  <div>
    See You later!
    <Redirect to='/login' />
  </div>
  )
}

export default LogoutComponent
