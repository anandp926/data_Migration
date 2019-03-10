import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import Drawer from '../components/drawer/drawer'

class LoginChecker extends Component {
    
    render() {
      const { isSignedIn} = this.props;
      if (isSignedIn) {
        return this.props.children
      } else if(isSignedIn === null){
        return <Redirect to="/" />
      } else{
        return <Redirect to="/" />
      }
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
  }
    
export default withRouter(connect(mapStateToProps)(LoginChecker))
