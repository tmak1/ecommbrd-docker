import React, { useState } from 'react';
import { NavLink as Rlink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SideDrawer from '../ui/SideDrawer';
import MenuDropdown from '../ui/MenuDropdown';
import SearchBar from '../../products/components/SearchBar';

import { logoutUser } from '../../../redux/actionCreators/userActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Backdrop from '@material-ui/core/Backdrop';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: 'blue',
    [theme.breakpoints.down(760)]: {
      display: 'none',
    },
  },
  menuButton: {
    display: 'none',
    marginRight: theme.spacing(10),
    [theme.breakpoints.down(760)]: {
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '5px',
    },
  },
  iconButton: {
    marginRight: theme.spacing(8),
    color: 'grey',
    '&:hover': {
      color: '#fff',
    },
    '&.active': {
      color: '#fff',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '15px',
    },
    [theme.breakpoints.down(760)]: {
      display: 'none',
    },
  },
  logo: {
    marginLeft: '35px',
    [theme.breakpoints.down(760)]: {
      display: 'none',
    },
  },
}));

const MainHeader = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.userAuth);
  const itemCount = useSelector((state) => state.cart.cartItems?.length);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <header>
      <AppBar position="fixed">
        <Backdrop open={open} onClick={handleDrawerClose} />
        <SideDrawer
          open={open}
          onClose={handleDrawerClose}
          loggedInUser={loggedInUser}
          logoutHandler={logoutHandler}
        />
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
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
          <SearchBar />
          <div className={classes.grow}></div>
          <IconButton
            edge="start"
            className={classes.iconButton}
            to="/cart"
            component={Rlink}
          >
            <ShoppingCartIcon />
            <Badge badgeContent={itemCount} color="error">
              <Typography variant="button">CART</Typography>
            </Badge>
          </IconButton>
          {loggedInUser?.token ? (
            <IconButton edge="start" className={classes.iconButton}>
              <MenuDropdown
                logoutHandler={logoutHandler}
                avatarColor={loggedInUser?.user?.avatarColor}
                userId={loggedInUser?.user?.id}
                isAdmin={loggedInUser?.user?.isAdmin}
              >
                {loggedInUser?.user?.name?.slice(0, 1).toUpperCase()}
              </MenuDropdown>
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              color="inherit"
              className={classes.iconButton}
              to="/auth"
              component={Rlink}
            >
              <PersonIcon />
              <Typography variant="button">SIGNIN</Typography>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default MainHeader;
