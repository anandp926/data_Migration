import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { signIn, signOut } from "../actions";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockOpen from '@material-ui/icons/LockOpen';
import Lock from '@material-ui/icons/Lock';

export class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: "843198720260-fudbfdavhcjvs0cljcsd7j23ka7mfelp.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          this.onAuthChange(this.auth.isSignedIn.get())
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
      this.props.history.push('/create-table');
    } else {
      this.props.signOut()
      this.props.history.push('/');
    }
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return (
        <ListItem button onClick={this.onSignOutClick}>
          <ListItemIcon><LockOpen /></ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      )
    } else {
      return (
        <ListItem button onClick={this.onSignInClick}>
          <ListItemIcon><Lock /></ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItem>
      )
    }
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  render() {
    return <div >{this.renderAuthButton()}</div>
  }
}
const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
}
export default withRouter(connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth))