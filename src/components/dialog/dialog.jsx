import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog = (props) => {
    return (
        <div>
          <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
              {props.children}
            </DialogContent>
          </Dialog>
        </div>
    );
}

export default FormDialog