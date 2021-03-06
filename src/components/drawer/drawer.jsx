import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import TableIcon from '@material-ui/icons/TableChart';
import CompareArrow from '@material-ui/icons/CompareArrows';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import LoginButton from '../../login/login';
import { connect } from "react-redux";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class MyDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  isActive = (value) => (this.props.location.pathname.split('/')[1] === value.split('/')[1] ? true : false)

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        {
          this.props.isSignedIn
          ?
          <List>
            <Link to="/create-table" style={{ textDecoration: 'none', color: '#fff' }}>
              <ListItem button selected={this.isActive('/create-table')}>
                <ListItemIcon><BorderAllIcon /></ListItemIcon>
                <ListItemText primary="Create Table" />
              </ListItem>
            </Link>
            <Link to="/tables" style={{ textDecoration: 'none', color: '#fff' }}>
              <ListItem button selected={this.isActive('/tables')}>
                <ListItemIcon><TableIcon /></ListItemIcon>
                <ListItemText primary="Tables" />
              </ListItem>
            </Link>
            <Link to="/migrate" style={{ textDecoration: 'none', color: '#fff' }}>
              <ListItem button selected={this.isActive('/migrate')}>
                <ListItemIcon><CompareArrow /></ListItemIcon>
                <ListItemText primary="Migrate" />
              </ListItem>
            </Link>
            <LoginButton/>
          </List>
          :
          <List>
            <LoginButton/>
          </List>
        }
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              FA Database
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

MyDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(MyDrawer));