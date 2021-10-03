import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: '5px',
  },
}));

const ErrorAlert = ({
  msg,
  margin = '16px',
  severity = 'error',
  putErrorIcon = true,
  fullWidth,
}) => {
  const classes = useStyles();
  let color;
  let backgroundColor;
  switch (severity) {
    case 'error':
      backgroundColor = 'rgba(255,0,0,0.1)';
      color = 'darkred';
      break;
    case 'success':
      backgroundColor = 'rgba(0,255,0,0.1)';
      color = 'darkgreen';
      break;
    case 'info':
      backgroundColor = 'rgba(0,0,255,0.1)';
      color = 'darkblue';
      break;
    default:
      backgroundColor = 'rgba(255,0,0,0.1)';
      color = 'darkred';
      break;
  }
  return (
    <div
      className={classes.root}
      style={{
        margin: margin,
        width: fullWidth && '100%',
        backgroundColor,
        color,
      }}
    >
      {putErrorIcon && <ErrorIcon />}
      <Typography
        component="p"
        variant="caption"
        style={{ width: fullWidth && '100%' }}
      >
        {msg || 'Error'}
      </Typography>
    </div>
  );
};

export default ErrorAlert;
