import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(6),
    minHeight: '100vh',
  },
}));
const MainLayout = (props) => {
  const classes = useStyles();
  return (
    <main>
      <Container maxWidth="xl" className={classes.root}>
        {props.children}
      </Container>
    </main>
  );
};

export default MainLayout;
