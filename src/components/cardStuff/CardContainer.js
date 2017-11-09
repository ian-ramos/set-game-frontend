import React, { Component } from 'react';
import { cardsArray } from '../../card_data.js'
import CardList from './CardList'

class CardContainer extends Component{

  state = {
    cards: cardsArray,
    activeCards: [],
    clickedCards: []
  }

  drawCard = () => {
    const index = Math.floor(Math.random() * this.state.cards.length)
    const card = this.state.cards[index]
    this.state.cards.splice(index, 1)
    return card
  }

  drawTo12 = () => {
    for (let i = this.state.activeCards.length; i < 12; i++) {
      this.state.activeCards.push(this.drawCard())
    }
    this.setState({activeCards: this.state.activeCards})
  }

  gameLogic = () => {
    while(!this.hasGoodSet() && this.state.cards.length !== 0){ //seconds check for the teeeeny chance that there isn't a set in 15 cards. Keeps drawing as long as there are still cards and there isn't a good set
      this.draw3More()  //draws 3 more if there isn't any good sets
    }
  }

  draw3More = () => { // altered so that it adds cards to end of list
    this.state.activeCards.splice(12, 0, this.drawCard())
    this.state.activeCards.splice(8, 0, this.drawCard())
    this.state.activeCards.splice(4, 0, this.drawCard())
  }

  onCardClick = (card) => {
    if (!this.state.clickedCards.includes(card)){
      card.clicked = true
      this.state.clickedCards.push(card)
      this.forceUpdate() //force update to page re-renders b/c we want the borders to re-render once clicked, but we're already setting state below
      if(this.state.clickedCards.length >= 3){ //checks if set is good then removes cards and draws new set
        if(this.clickedCardLogic()){
          this.removeClickedCards() //removes clickedCards from page
        }
        this.state.clickedCards.forEach(card => card.clicked = false) //doesn't really matter for removedCards, but if choose a set that's not a legit set, this will set all their properties back to unclicked
        this.setState({clickedCards: []})
      }
    } else {
      const idx = this.state.clickedCards.indexOf(card) //removes card from clickedCards array if you unclick it
      this.state.clickedCards.splice(idx, 1)
      card.clicked = false
      this.forceUpdate()
    }

  }

  hasGoodSet = () => { //checks to make sure there's at least 1 good set in the active cards
    for(let i=0; i < this.state.activeCards.length-2; i++){
      for(let j=i+1; j < this.state.activeCards.length-1; j++){
        for(let k=j+1; k < this.state.activeCards.length; k++){
          if(this.featureCheck(this.state.activeCards[i].fill, this.state.activeCards[j].fill, this.state.activeCards[k].fill) &&
          this.featureCheck(this.state.activeCards[i].color, this.state.activeCards[j].color, this.state.activeCards[k].color) &&
          this.featureCheck(this.state.activeCards[i].shape, this.state.activeCards[j].shape, this.state.activeCards[k].shape) &&
          this.featureCheck(this.state.activeCards[i].count, this.state.activeCards[j].count, this.state.activeCards[k].count)) {
            console.log(i, j, k, this.state.activeCards[i], this.state.activeCards[j], this.state.activeCards[k]);
            return true
          }
        }
      }
    }
    console.log(`no good set in ${this.state.activeCards.length}`);
    return false //can't return false after initial if b/c it would break out of loop if the 1st 3 cards wasn't a good set.  We need this to return false after it's looped through everything
  }

  removeClickedCards = () => { //called once clickedCards.length === 3
    if (this.state.activeCards.length === 12){ //replace cards at its index so the elements don't shift
      this.state.clickedCards.forEach(clickedCard => {
        const idx = this.state.activeCards.indexOf(clickedCard)
        this.state.activeCards.splice(idx, 1, this.drawCard())
      })
    } else { //if the length isn't 12, then you're just removing the clicked cards from the activeCards and letting them shift 
      this.state.activeCards = this.state.activeCards.filter(card => !this.state.clickedCards.includes(card))
    }
    this.gameLogic() //draws 3 more if there isn't a good set
  }

  clickedCardLogic = () => {
    if(!this.featureCheck(this.state.clickedCards[0].fill, this.state.clickedCards[1].fill, this.state.clickedCards[2].fill)) return false
    if(!this.featureCheck(this.state.clickedCards[0].color, this.state.clickedCards[1].color, this.state.clickedCards[2].color)) return false
    if(!this.featureCheck(this.state.clickedCards[0].shape, this.state.clickedCards[1].shape, this.state.clickedCards[2].shape)) return false
    if(!this.featureCheck(this.state.clickedCards[0].count, this.state.clickedCards[1].count, this.state.clickedCards[2].count)) return false
    return true
  }

  featureCheck = (a, b, c) => {
    if(a === b && b === c){
     return true
    }
    if(a !== b && a !== c && b !== c){
      return true
    }
    return false
  }

  render(){
    return(
      <div className="cardContainer">
        <CardList onCardClick={this.onCardClick} cards={this.state.activeCards} />
      </div>
    )
  }

  componentDidMount = () => {
    this.drawTo12()
    this.gameLogic()
  }
}

CardContainer.defaultProps = {

}


export default CardContainer;
