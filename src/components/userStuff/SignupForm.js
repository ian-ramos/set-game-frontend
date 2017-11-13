import React, { Component } from 'react';

class SignupForm extends Component{

  state = {
    name: "",
    password: "",
    pwConfirmation: ""
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.onSignup(this.state)
    this.setState({name: "", password: "", pwConfirmation: ""})
  }

  handleNameChange = (ev) => {
    this.setState({name: ev.target.value})
  }

  handlePasswordChange = (ev) => {
    this.setState({password: ev.target.value})
  }

  handlePwConfirmationChange = (ev) => {
    this.setState({pwConfirmation: ev.target.value})
  }

  render(){
    return(
    <form onSubmit={this.handleSubmit}>
      <label htmlFor="">Name: </label>
      <input type='text' value={this.state.name} onChange={this.handleNameChange} /><br />
      <label htmlFor="">Password: </label>
      <input type='password' value={this.state.password} onChange={this.handlePasswordChange} /><br />
      <label htmlFor="">Confirm Password: </label>
      <input type="password" value={this.state.pwConfirmation} onChange={this.handlePwConfirmationChange} /><br />
      <input type='submit' value='submit' />
    </form>
    )
  }
}

export default SignupForm
