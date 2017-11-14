import React, { Component } from 'react';

class TurnTimer extends Component{

  state = {
    timeLeft: 5
  }

  startTimer = () => {
    const countdown = setInterval(() => {
      if(this.state.timeLeft === 0) {
        clearInterval(countdown)
        this.props.onTimeOut()
      } else {
        this.setState({timeLeft: this.state.timeLeft - 1})
      }
    }, 1000)
  }

  render(){
    return(
      <div>
        <h2>Turn time left: {this.state.timeLeft}</h2>
      </div>
    )
  }

  componentDidMount = () => {
    this.startTimer()
  }
}

TurnTimer.defaultProps = {

}

export default TurnTimer;
