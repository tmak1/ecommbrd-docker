import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import LoadingLinear from '../../shared/ui/LoadingLinear';
import AlertMessage from '../../shared/ui/AlertMessage';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    margin: '30px auto',
    minWidth: '350px',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  rootBox: {
    width: '100%',
    margin: '7px auto',
    textAlign: 'center',
  },
}));

const TabPanel = ({ children, value, index }) => {
  const classes = useStyles();
  return (
    <Box hidden={value !== index} className={classes.rootBox}>
      {value === index ? children : null}
    </Box>
  );
};

const Auth = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const redirectQuery = search.has('redirect') ? search.get('redirect') : null;

  const { loading, error, loggedInUser } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (redirectQuery && loggedInUser) {
      history.push(`/${redirectQuery}`);
    }
  }, [redirectQuery, loggedInUser, history]);

  return (
    <>
      <div className={classes.root}>
        <Paper>
          <Tabs
            value={value}
            onChange={(event, val) => setValue(val)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Signin" />
            <Tab label="Signup" />
          </Tabs>
        </Paper>
        {loading && <LoadingLinear oneBarOnly />}
        {error && (
          <AlertMessage message={error} severity="error" variant="outlined" />
        )}
        <TabPanel value={value} index={0}>
          <LoginForm loggedIn={!!loggedInUser} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignupForm loggedIn={!!loggedInUser} />
        </TabPanel>
      </div>
    </>
  );
};

export default Auth;
