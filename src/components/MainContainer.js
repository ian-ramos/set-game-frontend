import React, { Component } from 'react';
import CardContainer from './cardStuff/CardContainer';
import NavBar from './NavBar';
import Timer from './Timer';
import UserContainer from './userStuff/UserContainer';
import StartButton from './StartButton';
import LoginForm from './LoginForm';
import { loginUser } from '../services/api'

class MainContainer extends Component{

  state = {
    time: 11,
    gameActive: false,
    current: 0,
    user: {}
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
    this.state.current = 0
    this.state.time = 11
    this.decrementTime()
  }

  addScore = () => {
    this.setState({current: this.state.current + 1})
  }

  handleLogin = (userObj) => {
    loginUser(userObj)
      .then(json => console.log(json))
  }

  render(){
    return(
      <div className="mainContainer">
        <NavBar />
        <LoginForm onLogin={this.handleLogin} />
        <UserContainer score={this.state.current}/>
        <StartButton onStart={this.handleStart}/>
        <CardContainer onScore={this.addScore}/>
        {this.state.gameActive === false ? null : <Timer time={this.state.time} />}
      </div>
    )
  }
}

MainContainer.defaultProps = {

}

export default MainContainer;
