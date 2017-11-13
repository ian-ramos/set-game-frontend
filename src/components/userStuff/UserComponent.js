import React from 'react';

const UserComponent = (props) => {
  return (
  <div>
    Name: {props.name} |
    High Score: {props.highScore} |
    Current Score: {props.currentScore}
  </div>
  )
}

UserComponent.defaultProps = {
  name: "",
  highScore: 0
}

export default UserComponent
