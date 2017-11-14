import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LogoutComponent from './LogoutComponent'
import NavBar from './NavBar';
import GameContainer from './gameStuff/GameContainer'
// import StartButton from './StartButton';
import LoginForm from './LoginForm';
import SignupForm from './userStuff/SignupForm';
import { loginUser, signupUser, getUserWithJwt } from '../services/api'
import ProfileComponent from './userStuff/ProfileComponent'
import { authorize } from '../HOCs/authorize'
import HighScoreTable from './miscComponents/HighScoreTable'
import MultiplayerContainer from './gameStuff/MultiplayerContainer'

class MainContainer extends Component{

  state = {
    user: {}
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

  updateHighScore = (newHighScore) => {
    this.setState({user: Object.assign({}, this.state.user, {highScore: newHighScore})})
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
    const AuthHighScoreTable = authorize(HighScoreTable)
    const AuthProfile = authorize(ProfileComponent)
    const AuthSignup = authorize(SignupForm)
    const AuthGame = authorize(GameContainer)
    const AuthMulti = authorize(MultiplayerContainer)
    return(
      <div className="mainContainer" ref="heyDude">
        <NavBar />
        <Route path='/scores' render={(props) => <AuthHighScoreTable {...props} scores={this.highScores} />} />
        <Route path='/login' render={(props) => <AuthLogin {...props} onLogin={this.handleLogin} />} />
        <Route path='/signup' render={(props) => <AuthSignup {...props} onSignup={this.onSignup}/>} />
        <Route path='/game' render={(props) => <AuthGame {...props} user={this.state.user} updateHighScore={this.updateHighScore} />} />
        <Route path='/multiplayer' render={(props) => <AuthMulti {...props} user={this.state.user} updateHighScore={this.updateHighScore} />} />
        <Route path='/user' render={(props) => <AuthProfile {...props} user={this.state.user} /> } />
        <Route path='/logout' render={() => <LogoutComponent onLogout={this.handleLogout} />} />

      </div>
    )
  }
}

MainContainer.defaultProps = {

}

export default MainContainer;
