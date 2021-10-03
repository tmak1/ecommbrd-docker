import React, { forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseSharp';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
    padding: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
  },
  actions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DecisionDialog = ({
  fullscreen = false,
  open,
  setDialogOpen,
  handleAction,
  title,
  content,
  children,
  actionBtnText,
}) => {
  const classes = useStyles();
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullscreen}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      scroll="paper"
    >
      <DialogTitle disableTypography className={classes.title}>
        <Typography variant="h6">{title}</Typography>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <DialogContentText>
          <Typography component="span" variant="h6" gutterBottom>
            {content}
          </Typography>
        </DialogContentText>
        {children}
      </DialogContent>
      {actionBtnText && (
        <DialogActions className={classes.actions}>
          <Button
            onClick={handleClose}
            variant="text"
            color="secondary"
            size="large"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            variant="text"
            color="secondary"
            size="large"
          >
            {actionBtnText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DecisionDialog;
