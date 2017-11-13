import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CardContainer from './cardStuff/CardContainer';
import LogoutComponent from './LogoutComponent'
import NavBar from './NavBar';
import Timer from './Timer';
// import StartButton from './StartButton';
import LoginForm from './LoginForm';
import SignupForm from './userStuff/SignupForm';
import { loginUser, signupUser, postHighScore, getUserWithJwt } from '../services/api'
import ProfileComponent from './userStuff/ProfileComponent'
import UserComponent from './userStuff/UserComponent'
import { authorize } from '../HOCs/authorize'
import HighScoreTable from './miscComponents/HighScoreTable'

class MainContainer extends Component{

  state = {
    gameActive: false,
    currentScore: 0,
    user: {},
    maxTime: 1,
    currentTime: 1
  }

  decrementTime = () => {
    const countdown = setInterval(() => {
      if(this.state.currentTime === 0) {
        clearInterval(countdown)
        this.checkNewScore()
      } else {
        this.setState({currentTime: this.state.currentTime - 1, gameActive: true})
      }
    }, 1000)
  }

  checkNewScore = () => {
    if (this.state.currentScore > this.state.user.highScore){
      alert('New High Score!')
      postHighScore(Object.assign({}, this.state.user, {high_score: this.state.currentScore}))
        .then(json => {
          const newUserInfo = this.filterJson(json)
          this.setState({user: newUserInfo, gameActive: false})
        })
    } else {
      alert('Game Over!')
      this.setState({gameActive: false})
    }
  }

  handleStart = () => {
    if (this.state.gameActive === false) { //so it doesn't screw up countdown if you push start multiple times
      this.setState({gameActive: true, currentScore: 0, currentTime: this.state.maxTime})
      this.decrementTime()
    }
  }

  addScore = () => {
    this.setState({currentScore: this.state.currentScore + 1})
  }

  handleLogin = (userObj) => {
    loginUser(userObj)
      .then(json => {
        localStorage.setItem("jwtToken", json.jwt_token)
        const newState = {user: this.filterJson(json.user)}
        this.setState(newState)
      })
  }

  handleLogout = () => {
    localStorage.removeItem('jwtToken')
    this.setState({user: {}, currentScore: 0, gameActive: false})
  }

  filterJson = (json) => {
    return {name: json.name, highScore: json.high_score, id: json.id}
  }

  onSignup = (newUserObj) => {
    signupUser(newUserObj)
      .then(json => {
        localStorage.setItem("jwtToken", json.jwt_token)
        this.setState({user: this.filterJson(json.user)})
      }
    )
  }

  componentDidMount = () => {
    if(localStorage.getItem('jwtToken') && this.state.user.name === undefined){
      getUserWithJwt()
        .then(json => {
          this.setState({user: {name: json.name, id: json.id, highScore: json.high_score}})
        })
    } }

  render(){
    const AuthLogin = authorize(LoginForm)
    const AuthTimer = authorize(Timer)
    const AuthHighScoreTable = authorize(HighScoreTable)
    const AuthProfile = authorize(ProfileComponent)
    const AuthSignup = authorize(SignupForm)
    return(
      <div className="mainContainer" ref="heyDude">
        <NavBar />
        <UserComponent currentScore={this.state.currentScore} {...this.state.user} />
        <Route path='/scores' render={(props) => <AuthHighScoreTable {...props} scores={this.highScores} />} />
        <Route path='/login' render={(props) => <AuthLogin {...props} onLogin={this.handleLogin} />} />
        <Route path='/signup' render={(props) => <AuthSignup {...props} onSignup={this.onSignup}/>} />
        <Route path='/game' render={(props) => {
          return (<div>
            {this.state.gameActive === false ? null : <CardContainer onScore={this.addScore}/>}
            <AuthTimer {...props} time={this.state.time} onTimerOut={this.checkNewScore} onStart={this.handleStart} maxTime={this.state.maxTime} currentTime={this.state.currentTime}/>
            </div>)
        }} />
        <Route path='/user' render={(props) => {
          return(<AuthProfile {...props} user={this.state.user} />)
        }} />
        <Route path='/logout' render={() => <LogoutComponent onLogout={this.handleLogout} />} />

      </div>
    )
  }
}

MainContainer.defaultProps = {

}

export default MainContainer;
