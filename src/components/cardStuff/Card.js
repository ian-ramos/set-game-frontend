import React from 'react';

const Card = (props) => {
  const handleClick = () => {
    props.onCardClick(props.card)
  }
  return (
  <div onClick={handleClick}>
    <img src={require("../../cardImages/red-diamond-empty-1.jpg")} />
    {props.number} -
    {props.card.color}
    {props.card.shape}
    {props.card.fill}
    {props.card.count}
  </div>
  )
}

Card.defaultProps = {

}

export default Card
