import React, { Component } from 'react';

class UserContainer extends Component{

  state = {
    user: {}
  }

  render(){
    return(
      <div>
        {this.props.score}
      </div>
    )
  }
}

UserContainer.defaultProps = {

}


export default UserContainer;
