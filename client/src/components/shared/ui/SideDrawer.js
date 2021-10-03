import React, { useEffect } from 'react';
import { NavLink as Rlink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles((theme) => ({
  drawer: {
    display: 'none',
    width: theme.spacing(30),
    flexShrink: 0,
    [theme.breakpoints.down(760)]: {
      display: 'block',
    },
  },
  drawerPaper: {
    width: theme.spacing(30),
  },
  listItem: {
    margin: theme.spacing(3, '0'),
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
  },
  listItemText: {
    marginLeft: '30px',
  },
  logo: {
    margin: '0 auto',
    marginBottom: '20px',
    [theme.breakpoints.up(760)]: {
      display: 'none',
    },
  },
}));

const SideDrawer = ({ onClose, open, loggedInUser, logoutHandler }) => {
  const classes = useStyles();
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  return (
    <Drawer
      variant="persistent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClick={onClose}
      open={open}
      anchor="left"
    >
      <Toolbar />
      <Link
        className={classes.logo}
        component={Rlink}
        to="/products"
        color="inherit"
        underline="none"
        variant="h5"
      >
        GoShop
      </Link>
      <Divider />
      <List component="nav">
        <ListItem
          key="cart"
          component={Rlink}
          to="/cart"
          className={classes.listItem}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
            <ListItemText primary="CART" className={classes.listItemText} />
          </ListItemIcon>
        </ListItem>

        {loggedInUser?.user.isAdmin && (
          <ListItem
            key="all_users"
            component={Rlink}
            to="/users"
            className={classes.listItem}
          >
            <ListItemIcon>
              <PeopleAltIcon />
              <ListItemText
                primary="ALL USERS"
                className={classes.listItemText}
              />
            </ListItemIcon>
          </ListItem>
        )}
        {loggedInUser?.user.isAdmin && (
          <ListItem
            key="my_products"
            component={Rlink}
            to={`/products/users/${loggedInUser?.user.id}`}
            className={classes.listItem}
          >
            <ListItemIcon>
              <ListAltIcon />
              <ListItemText
                primary="MY PRODUCTS"
                className={classes.listItemText}
              />
            </ListItemIcon>
          </ListItem>
        )}
        {loggedInUser?.token && (
          <ListItem
            key="profile"
            component={Rlink}
            to={`/users/${loggedInUser?.user.id}`}
            className={classes.listItem}
          >
            <ListItemIcon>
              <PersonIcon />
              <ListItemText
                primary="PROFILE"
                className={classes.listItemText}
              />
            </ListItemIcon>
          </ListItem>
        )}
        {loggedInUser?.token ? (
          <ListItem
            key="auth"
            component="li"
            onClick={() => logoutHandler()}
            className={classes.listItem}
          >
            <ListItemIcon>
              <ExitToAppIcon />
              <ListItemText
                primary="SIGN OUT"
                className={classes.listItemText}
              />
            </ListItemIcon>
          </ListItem>
        ) : (
          <ListItem
            key="auth"
            component={Rlink}
            to="/auth"
            className={classes.listItem}
          >
            <ListItemIcon>
              <ExitToAppIcon />
              <ListItemText
                primary="SIGN IN"
                className={classes.listItemText}
              />
            </ListItemIcon>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
