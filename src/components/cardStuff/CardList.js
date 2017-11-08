import React from 'react';
import Card from './Card'
import { Grid } from 'semantic-ui-react';

const CardList = (props) => {
  const cardsArr = props.cards.map((card, idx) =><Grid.Column><Card key={idx} card={card} onCardClick={props.onCardClick} number={idx} /></Grid.Column> )
  const formattedCardsArr = []
  for(let i = 0; i < cardsArr.length / 3; i++){
    formattedCardsArr.push(<Grid.Row columns={3} key={i/10}>{cardsArr[i*3]}{cardsArr[(i*3)+1]}{cardsArr[(i*3)+2]}</Grid.Row>)
  }

  return (
  <Grid>
    {formattedCardsArr}
  </Grid>

  )

}

CardList.defaultProps = {

}

export default CardList
