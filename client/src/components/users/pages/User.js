import React, { useState } from 'react';

import UserProfile from '../components/UserProfile';
import UserOrders from '../components/UserOrders';
import UserReviews from '../../products/pages/UserReviews';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '30px 0',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '& > .MuiPaper-root': {
      width: '100%',
      margin: '20px auto',
    },
    '& .MuiTabs-flexContainer': {
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
  rootBox: {
    width: '100%',
    margin: '7px auto',
    textAlign: 'center',
  },
  rootTabs: {
    display: 'inline-block',
    marginBottom: '80px',
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

const User = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  // const { loading, error, loggedInUser } = useSelector(
  //   (state) => state.userAuth
  // );

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.rootTabs}>
          <Tabs
            value={value}
            onChange={(event, val) => setValue(val)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Profile" />
            <Tab label="My Orders" />
            <Tab label="My Reviews" />
          </Tabs>
        </Paper>
        {/* {loading && <LoadingLinear oneBarOnly />}
        {error && (
          <AlertMessage message={error} severity="error" variant="outlined" />
        )} */}
        <TabPanel value={value} index={0}>
          <UserProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserOrders />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserReviews />
        </TabPanel>
      </div>
    </>
  );
};

export default User;
