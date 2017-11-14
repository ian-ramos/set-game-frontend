import React from 'react';

const MultiplayerComponent = (props) => {
  const scores = props.playerScores.slice(0, props.numberOfPlayers).map((score, idx) => (<span key={idx*100}>Player {idx + 1}:  {score} | </span>))
  return (
  <div>
    | {scores}
  </div>
  )
}

export default MultiplayerComponent
