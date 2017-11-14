import React, { Component } from 'react';
import CardContainer from '../cardStuff/CardContainer'
import { postHighScore } from '../../services/api'
import Timer from '../Timer'
import UserComponent from '../userStuff/UserComponent'

class GameContainer extends Component{

  state = {
    maxTime: 120,
    currentTime: 120,
    currentScore: 0,
    gameActive: false,
    gameRunning: false
  }

  decrementTime = () => {
    const countdown = setInterval(() => {
      if(this.state.currentTime === 0) {
        clearInterval(countdown)
        this.checkNewScore()
      } else {
        if(this.state.gameRunning === false) { //pauses game
          clearInterval(countdown)
        } else {
          this.setState({currentTime: this.state.currentTime - 1, gameActive: true})
        }
      }
    }, 1000)
  }

  checkNewScore = () => {
    if (this.state.currentScore > this.props.user.highScore){
      alert('New High Score!')
      this.props.updateHighScore(this.state.currentScore)
      postHighScore(Object.assign({}, this.props.user, {high_score: this.state.currentScore}))
    } else {
      alert('Game Over!')
      this.setState({gameActive: false, gameRunning: false})
    }
  }

  handleStart = () => {
    if (this.state.gameActive === false) { //so it doesn't screw up countdown if you push start multiple times
      this.setState({gameActive: true, currentScore: 0, currentTime: this.state.maxTime, gameRunning: true})
      this.decrementTime()
    } else { //toggles button between pause and start
      if(this.state.gameRunning) {
        this.setState({gameRunning: false})
      } else {
        this.setState({gameRunning: true}, this.decrementTime)
      }
    }
  }

  addScore = () => {
    this.setState({currentScore: this.state.currentScore + 1})
  }

  iDoNothing = () => {
    //See? Nothing...see Mutliplayer Container for reference
  }

  render(){
    return (
      <div>
        <UserComponent {...this.props.user} onScore={this.addScore} currentScore={this.state.currentScore} />
        {this.state.gameActive === false ? null : <CardContainer cardsClickable={this.state.gameRunning} finishedSet={this.iDoNothing} onScore={this.addScore}/>}
        <Timer time={this.state.time} onTimerOut={this.checkNewScore} onStart={this.handleStart} maxTime={this.state.maxTime} currentTime={this.state.currentTime} gameRunning={this.state.gameRunning} showButton={true}/>
      </div>
    )
  }
}

GameContainer.defaultProps = {
}

export default GameContainer;
