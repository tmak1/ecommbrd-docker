import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: '600',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

const PageHeading = ({ text, size, marginBottom = '0px', ...props }) => {
  const classes = useStyles();
  const sizeStyle =
    size === 'small'
      ? { fontSize: '14px' }
      : size === 'medium'
      ? { fontSize: '25px' }
      : size === 'big'
      ? { fontSize: '45px' }
      : { fontSize: '32px' };
  const styles = { ...sizeStyle, marginBottom };

  return (
    <Typography className={classes.heading} style={styles} {...props}>
      {text}
    </Typography>
  );
};

export default PageHeading;
