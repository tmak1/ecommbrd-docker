import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    maxWidth: '500px',
    margin: theme.spacing(2, 'auto'),
    fontSize: '16px',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      '& *': {
        fontSize: '10px',
      },
    },
  },
  title: {
    fontSize: '24px',
    '&::first-letter': {
      textTransform: 'uppercase',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
    },
  },
}));

export default function AlertMessage({
  message,
  severity,
  showTitle = true,
  variant = 'standard',
  fullWidth = false,
  small = false,
  fetchFailed,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const smallStyle = {
    marginBottom: '20px',
    padding: '5px',
    width: '100%',
    maxHeight: '20px',
    fontSize: '12px',
    backgroundColor: 'transparent',
  };
  const fullWidthStyle = { width: '100%' };
  return (
    <Collapse in={open}>
      <Alert
        variant={variant}
        severity={severity}
        className={classes.root}
        style={small ? smallStyle : fullWidth ? fullWidthStyle : null}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {showTitle && (
          <AlertTitle className={classes.title}>{severity}</AlertTitle>
        )}
        {message || `Failed to get "${fetchFailed}"`}
      </Alert>
    </Collapse>
  );
}
