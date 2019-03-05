import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import { Link, withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  }
});

class InteractiveList extends React.Component {

  render() {
    const { classes, tables } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          {
            tables && (
              Object.keys(tables).map((keys) => (
                <Grid item xs={12} md={3} key={keys}>
                  <Link to={`/tables/${keys}`} style={{ textDecoration: 'none', color: '#fff' }}>
                    <List component="nav">
                      <ListItem button>
                        <ListItemIcon>
                          <BorderAllIcon />
                        </ListItemIcon>
                        <ListItemText primary={keys} />
                      </ListItem>
                    </List>
                  </Link>
                </Grid>
              ))
            )
          }
        </Grid>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(InteractiveList));