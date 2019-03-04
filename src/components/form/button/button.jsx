import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    // padding: theme.spacing.unit * 2
  }
});

function ContainedButtons(props) {
  const { classes } = props;
  return (
    <Button
      variant="contained"
      size={props.size}
      color={props.color}
      className={classes.button}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);