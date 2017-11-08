import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cardsArray } from '../card_data.js'
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
    if(this.state.cards.length !== 0){
      for (let i = this.state.activeCards.length; i < 12; i++) {
        this.state.activeCards.push(this.drawCard())
      }
      while(!this.hasGoodSet() && this.state.cards.length !== 0){ //seconds check for the teeeeny chance that there isn't a set in 15 cards. Keeps drawing as long as there are still cards and there isn't a good set
        this.draw3More() //draws 3 more if there isn't any good sets
      }
      this.setState({activeCards: this.state.activeCards})
    } else {
      if(!this.hasGoodSet()){ //no cards left to draw and no good set
        console.log("Game Over");
      }
    }
  }

  draw3More = () => {
    for (let i = 0; i < 3; i++) {
      console.log("drawing three more");
      this.state.activeCards.push(this.drawCard())
    }
  }

  onCardClick = (card) => {
    if (!this.state.clickedCards.includes(card)){
      this.state.clickedCards.push(card)
    }
    if(this.state.clickedCards.length >= 3){ //checks if set is good then removes cards and draws new set
      if(this.clickedCardLogic()){
        this.removeClickedCards()
      }
      this.setState({clickedCards: []})
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
    this.state.activeCards = this.state.activeCards.filter(card => !this.state.clickedCards.includes(card))
    this.drawTo12()
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
      <div>
        <CardList onCardClick={this.onCardClick} cards={this.state.activeCards} />
      </div>
    )
  }

  componentDidMount = () => {
    this.drawTo12()
  }
}

CardContainer.defaultProps = {

}

CardContainer.propTypes = {

}

export default CardContainer;