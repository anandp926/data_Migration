import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '../../../components/form/button/button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BorderAllIcon from '@material-ui/icons/BorderAll';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  }
});

function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class InteractiveList extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
            {
                generate(
                    <Grid item xs={12} md={3}>
                        <List component="nav">
                            <ListItem button>
                                <ListItemIcon>
                                    <BorderAllIcon />
                                </ListItemIcon>
                                <ListItemText primary="users" />
                            </ListItem>
                        </List>
                    </Grid>
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

export default withStyles(styles)(InteractiveList);