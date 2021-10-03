import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyle = makeStyles((theme) => ({
  footer: {
    paddingTop: '20px',
    width: '100%',
    minHeight: '10vh',
    backgroundColor: '#fffffd',
  },
}));

const MainFooter = () => {
  const classes = useStyle();
  return (
    <footer className={classes.footer}>
      <Container>
        <Typography variant="subtitle2" align="center" color="textSecondary">
          GoShop &copy; 2021
        </Typography>
      </Container>
    </footer>
  );
};

export default MainFooter;
