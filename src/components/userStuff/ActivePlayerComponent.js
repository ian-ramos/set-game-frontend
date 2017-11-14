import React from 'react';

const ActivePlayerComponent = (props) => {
  return (
  <div>
    <h2>Current Player: {props.idx + 1}</h2>
  </div>
  )
}

ActivePlayerComponent.defaultProps = {

}

export default ActivePlayerComponent
