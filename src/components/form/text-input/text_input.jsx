import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

const InputType = (props) => {
  const { classes } = props;
  return (
    <TextField
      id="outlined-name"
      label={props.label}
      className={classes.textField}
      value={props.value}
      name={props.name}
      onChange={props.onInputChange}
      margin="normal"
      variant="outlined"
      defaultValue={props.default}
      placeholder={props.placeholder}
      InputProps={{
        readOnly: props.readOnly ? true : false,
      }}
    />
  );
}

InputType.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputType);