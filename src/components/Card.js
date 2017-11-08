import React from 'react';

const Card = (props) => {
  const handleClick = () => {
    props.onCardClick(props.card)
  }
  return (
  <div onClick={handleClick}>
    {props.number} -
    {props.card.shape}
    {props.card.color}
    {props.card.count}
    {props.card.fill}
  </div>
  )
}

Card.defaultProps = {

}

export default Card
