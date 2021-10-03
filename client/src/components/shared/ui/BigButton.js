import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  btn: {
    width: '97%',
    margin: '0',
    padding: '14px',
    backgroundColor: theme.palette.primary.dark,
    fontSize: '14px',
    fontWeight: '700',
    borderRadius: '0',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const BigButton = ({
  children,
  type = 'button',
  disabled = false,
  onClick,
  variant = 'contained',
}) => {
  const classes = useStyles();
  return (
    <Button
      type={type}
      disableElevation
      variant={variant}
      disabled={disabled}
      className={classes.btn}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default BigButton;
