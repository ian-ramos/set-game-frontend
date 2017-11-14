import React, { Component } from 'react';
import CardContainer from '../cardStuff/CardContainer';
import Timer from '../Timer';
import TurnTimer from './TurnTimer'
import MultiplayerComponent from '../userStuff/MultiplayerComponent';
import MultiplayerForm from './MultiplayerForm';
import ActivePlayerComponent from '../userStuff/ActivePlayerComponent';

class MultiplayerContainer extends Component{

  state = {
    maxTime: 30,
    currentTime: 120,
    playerScores: [0, 0, 0, 0],
    playerKeys: ['a','p','c','d'],
    gameActive: false,
    gameRunning: false,
    recentPlayer: -1, //used to add score to that person
    numberOfPlayers: 2
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

  restartTimer = () => {
    this.setState({gameRunning: true}, this.decrementTime)
  }

  checkNewScore = () => {
    const max = Math.max(...this.state.playerScores)
    const arr = this.state.playerScores.slice(0, this.state.numberOfPlayers).map(score => score === max)
    let alertString = ''
    for(let i = 0; i < arr.length; i++) {
      if (arr[i] === true) {
        alertString += `Player ${i + 1} wins!\n`
      }
    }
    alert(alertString)
    this.setState({gameActive: false, gameRunning: false, playerScores: [0,0,0,0]})
  }

  handleStart = () => {
    if (this.state.gameActive === false) { //so it doesn't screw up countdown if you push start multiple times
      this.setState({gameActive: true, currentScore: 0, currentTime: this.state.maxTime, gameRunning: true})
      this.decrementTime()
    }
  }

  addScore = () => {
    const newScores = [...this.state.playerScores]
    newScores[this.state.recentPlayer]++
    this.setState({playerScores: newScores})
  }

  handleKeyPress = (e) => {
    const keyPress = e.key
    if (this.state.playerKeys.slice(0, this.state.numberOfPlayers).includes(keyPress)){ //making a copy of playerKeys array using slice, and then checking if they key that was pressed is one of the playerKeys
      this.setState({gameRunning: false, recentPlayer: this.state.playerKeys.indexOf(keyPress)})
    }
  }

  componentDidMount = () => {
    window.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount = () => {
    window.removeEventListener('keypress', this.handleKeyPress)
  }

  onPlayerCountChange = (value) => {
    this.setState({numberOfPlayers: value})
  }

  onPlayerKeyChange = (value, playerIdx) => {
    const newKeys = [...this.state.playerKeys]
    newKeys[playerIdx] = value
    this.setState({playerKeys: newKeys})
  }

  onTurnTimeOut = () => {
    this.setState({gameRunning: true}, this.decrementTime)
  }

  render(){
    return (
      <div>
        {this.state.gameActive ? null : <MultiplayerForm numberOfPlayers={this.state.numberOfPlayers} onPlayerCountChange={this.onPlayerCountChange} onPlayerKeyChange={this.onPlayerKeyChange} playerKeys={this.state.playerKeys}/>}

        <MultiplayerComponent playerScores={this.state.playerScores} numberOfPlayers={this.state.numberOfPlayers}/>

        {(this.state.gameActive && !this.state.gameRunning) ? <div><ActivePlayerComponent idx={this.state.recentPlayer}/><TurnTimer onTimeOut={this.onTurnTimeOut}/></div> : null}

        {this.state.gameActive === false ? null : <CardContainer finishedSet={this.restartTimer} cardsClickable={!this.state.gameRunning} onScore={this.addScore}/>}

        <Timer time={this.state.time} onTimerOut={this.checkNewScore} onStart={this.handleStart} maxTime={this.state.maxTime} currentTime={this.state.currentTime} gameRunning={this.state.gameRunning} showButton={!this.state.gameActive} />
      </div>
    )
  }
}

MultiplayerContainer.defaultProps = {
  numberOfPlayers: 2
}

export default MultiplayerContainer;
