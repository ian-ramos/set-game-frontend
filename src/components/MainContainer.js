import React, { Component } from 'react';
import CardContainer from './cardStuff/CardContainer'
import NavBar from './NavBar'
import Timer from './Timer'
import StartButton from './StartButton'

class MainContainer extends Component{

  state = {
    time: 11,
    gameActive: false
  }

  decrementTime = () => {
    const countdown = setInterval(() => {
      if(this.state.time === 0) {
        clearInterval(countdown)
        this.setState({gameActive: false})
      } else {
        this.setState({time: this.state.time - 1, gameActive: true})
      }
    }, 1000)
  }

  handleStart = () => {
    this.state.time = 11
    this.decrementTime()
  }

  render(){
    return(
      <div className="mainContainer">
        <NavBar />
        <StartButton onStart={this.handleStart}/>
        <CardContainer />
        {this.state.gameActive === false ? null : <Timer time={this.state.time} />}
      </div>
    )
  }
}

MainContainer.defaultProps = {

}

export default MainContainer;
