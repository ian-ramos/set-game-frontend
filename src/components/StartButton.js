import React from 'react';
import { Button } from 'semantic-ui-react'

const StartButton = (props) => {

  const handleClick = () => props.onStart()

  return (
  <Button primary onClick={handleClick} content='Start Game'/>
  )
}

StartButton.defaultProps = {

}

export default StartButton
