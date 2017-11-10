import React from 'react';

const Card = (props) => {
  const handleClick = () => {
    props.onCardClick(props.card)
  }
  const imgSrc = `${props.card.color}-${props.card.shape}-${props.card.fill}-${props.card.count}`
  return (
  <div onClick={handleClick} >
    <img style={{border: `5px solid ${props.card.clicked ? 'yellow' : 'white'}`}} src={require(`../../cardImages/${imgSrc}.jpg`)} alt={imgSrc}/>

  </div>
  )
}

Card.defaultProps = {

}

export default Card
//
// {props.number} -
// {props.card.color}
// {props.card.shape}
// {props.card.fill}
// {props.card.count}
