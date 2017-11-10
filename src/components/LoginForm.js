import React, { Component } from 'react';

class LoginForm extends Component{

  state = {
    name: "",
    password: ""
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.onLogin(this.state)
    this.setState({name: "", password: ""})
  }

  handleNameChange = (ev) => {
    this.setState({name: ev.target.value})
  }

  handlePasswordChange = (ev) => {
    this.setState({password: ev.target.value})
  }

  render(){
    return(
    <form onSubmit={this.handleSubmit}>
      <input type='text' value={this.state.name} onChange={this.handleNameChange} />
      <input type='password' value={this.state.password} onChange={this.handlePasswordChange} />
      <input type='submit' value='submit' />
    </form>
    )
  }
}

export default LoginForm
