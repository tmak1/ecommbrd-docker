import { useState, useEffect, useRef } from 'react';
import { Link as Rlink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const MenuDropdown = ({
  children,
  userId,
  isAdmin,
  logoutHandler,
  avatarColor,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Avatar
        ref={anchorRef}
        onClick={handleToggle}
        style={{ backgroundColor: avatarColor }}
      >
        {children}
      </Avatar>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {isAdmin && (
                    <MenuItem>
                      <Link
                        component={Rlink}
                        to={`/users`}
                        underline="none"
                        onClick={handleClose}
                        className={classes.links}
                      >
                        All Users
                      </Link>
                    </MenuItem>
                  )}
                  {isAdmin && (
                    <MenuItem>
                      <Link
                        component={Rlink}
                        to={`/products/users/${userId}`}
                        underline="none"
                        onClick={handleClose}
                        className={classes.links}
                      >
                        My Products
                      </Link>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <Link
                      component={Rlink}
                      to={`/users/${userId}`}
                      underline="none"
                      onClick={handleClose}
                      className={classes.links}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default MenuDropdown;
