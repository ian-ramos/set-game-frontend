import React from 'react';

const ProfileComponent = (props) => {
  return (
  <div>
    <h1>{props.user.name}</h1>
    <h2>Highest Score: {props.user.highScore}</h2>
  </div>
  )
}

ProfileComponent.defaultProps = {

}

export default ProfileComponent
