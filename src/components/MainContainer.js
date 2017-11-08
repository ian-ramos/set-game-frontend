import React, { Component } from 'react';
import CardContainer from './cardStuff/CardContainer'
import NavBar from './NavBar'

class MainContainer extends Component{

  state = {

  }

  render(){
    return(
      <div className="mainContainer">
        <NavBar />
        <CardContainer />
      </div>
    )
  }
}

MainContainer.defaultProps = {

}

export default MainContainer;
