import React from 'react';

const MultiplayerForm = (props) => {
  const handleCountChange = (ev) => {
    if (ev.target.value >= 2 && ev.target.value <= 4) {
      props.onPlayerCountChange(ev.target.value)
    }
  }

  const handlePlayerKeyChange = (ev) => {
    if(ev.target.value.length <= 1){
      props.onPlayerKeyChange(ev.target.value, parseInt(ev.target.dataset.player))
    }
  }

  const inputKeys = []
  for (let i = 0; i < props.numberOfPlayers; i++){
    inputKeys.push(<div key={i*10}><label htmlFor="">Player {i+1} key: </label><input data-player={i} key={i} type="text" value={props.playerKeys[i]} onChange={handlePlayerKeyChange} /></div>)
  }


  return (
    <form>
      <label htmlFor="">Number of Players: </label>
      <input type='number' onChange={handleCountChange} value={props.numberOfPlayers} placeholder="2-4" />
      {inputKeys}
    </form>
  )
}

MultiplayerForm.defaultProps = {

}

export default MultiplayerForm
