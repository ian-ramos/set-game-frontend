import React from 'react';
import Card from './Card'
import { Grid } from 'semantic-ui-react';

const CardList = (props) => {
  const numOfCols = props.cards.length / 3 //usually => 4, sometimes => 5
  const cardsArr = props.cards.map((card, idx) =><Grid.Column key={idx*10}><Card key={idx} card={card} onCardClick={props.onCardClick} number={idx} /></Grid.Column> )

  const formattedCardsArr = []

  for(let i = 0; i < cardsArr.length / numOfCols/* will always return 3 */; i++){  //usually 12 / 4 => 3 else 15 / 5 => 3
    let holder = [] //will hold all the rendered Card components
    for (let j = 0; j < numOfCols; j++){
      holder.push(cardsArr[(i*numOfCols)+j]) //grabbing each Card component. By multiplying it by the number of cols, we can grab the next section of 4 elements on the successive iteration.  Adding j allows us to grab the next element in that section
    }
    formattedCardsArr.push(<Grid.Row columns={numOfCols} key={i/10}>{holder}</Grid.Row>) //once inner loop breaks, it'll push this to the formattedCardsArr)
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
