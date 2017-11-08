import React from 'react';
import Card from './Card'

const CardList = (props) => {
  const cardsArr = props.cards.map((card, idx) => <Card key={idx} card={card} onCardClick={props.onCardClick} number={idx} /> )
  return (
  <div>
    {cardsArr}
  </div>
  )

}

CardList.defaultProps = {

}

export default CardList
