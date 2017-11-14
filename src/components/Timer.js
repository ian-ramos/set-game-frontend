import React from 'react';
import { Button } from 'semantic-ui-react'

const Timer = (props) => {

  const handleClick = () => {
    props.onStart()
  }

  return(
    <div>
      {props.showButton ? <Button primary onClick={handleClick} content={props.gameRunning ? 'Pause Game' : 'Start Game'}/> : null}
      <h1>{props.currentTime} second{props.currentTime === 1 ? null : 's'} left!</h1>
    </div>
  )
}

Timer.defaultProps = {

}

export default Timer;
