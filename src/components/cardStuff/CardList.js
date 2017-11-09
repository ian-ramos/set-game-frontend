import React from 'react';
import Card from './Card'
import { Grid } from 'semantic-ui-react';

const CardList = (props) => {
  const numOfCols = props.cards.length / 3 //usually => 4, sometimes => 5
  const cardsArr = props.cards.map((card, idx) =><Grid.Column><Card key={idx} card={card} onCardClick={props.onCardClick} number={idx} /></Grid.Column> )

  const formattedCardsArr = []

  for(let i = 0; i < cardsArr.length / numOfCols/* will always return 3 */; i++){  //usually 12 / 4 => 3 else 15 / 5 => 3
    let holder = [] //will hold all the rendered Card components
    for (let j = 0; j < numOfCols; j++){
      holder.push(cardsArr[(i*numOfCols)+j]) //[0 * 4 + 0], [0 * 4 + 1]...[2 * 4 + 3] => for each row i, it will render out the correct number of cards
    }
    formattedCardsArr.push(<Grid.Row columns={numOfCols} key={i/10}>{holder}</Grid.Row>)
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
