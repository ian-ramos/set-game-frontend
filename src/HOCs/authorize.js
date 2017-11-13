import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export const authorize = (SomeComponent) => {
  return(
    class extends Component{

      loggedIn = () => {
          return !!localStorage.getItem('jwtToken')
      }

      render(){
        const { pathname } = this.props.location
        if(this.loggedIn() && (pathname === '/login' || pathname === '/signup')){
          return (<Redirect to='/user' />)
        }
        if(!this.loggedIn() && (pathname !== '/login')){
          if(pathname === '/signup'){
            return (<SomeComponent {...this.props} />)
          }
          return (<Redirect to='/login' />)
        }
        return (<SomeComponent {...this.props} />)
      }
    }
  )
}
