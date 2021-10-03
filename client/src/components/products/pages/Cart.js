import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AlertMessage from '../../shared/ui/AlertMessage';

import {
  addToCart,
  removeFromCart,
} from '../../../redux/actionCreators/cartActionCreators';

import SkeletonCart from '../../shared/ui/skeletons/SkeletonCart';

import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import PageHeading from '../../shared/ui/PageHeading';
import CartTotal from '../components/CartTotal';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'flex-end',
    },
  },
  paper: {
    width: theme.spacing(20),
    height: theme.spacing(13),
  },
  media: {
    width: '100%',
    height: '100%',
  },
  select: {
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: '13px',
      '&>svg': {
        display: 'none',
      },
    },
  },
}));

const Cart = () => {
  const classes = useStyles();
  const history = useHistory();
  const pid = useParams().pid;

  const location = useLocation().search;
  const query = location ? new URLSearchParams(location) : null;
  const qty = query?.has('qty') ? Number(query.get('qty')) : 1;

  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.userAuth);
  const { loading, error, cartItems } = useSelector((state) => state.cart);
  const [showTotalHeader, setShowTotalHeader] = useState(false);
  const [subTotal, setSubTotal] = useState(0);

  const addToCartHandler = useCallback(
    (pid, qty) => {
      dispatch(addToCart(pid, qty));
    },
    [dispatch]
  );
  const removeFromCartHandler = (pid) => {
    dispatch(removeFromCart(pid));
  };

  const calculateSubTotal = (cartItems) => {
    let total = cartItems
      .reduce((acc, product) => {
        return product.price * product.qty + acc;
      }, 0)
      .toFixed(2);
    setSubTotal(total);
  };

  const checkoutHandler = () => {
    history.push(loggedInUser ? '/checkout' : `/auth?redirect=checkout`);
  };

  useEffect(() => {
    if (pid && qty) {
      addToCartHandler(pid, qty);
    }
  }, [pid, qty, addToCartHandler]);

  useEffect(() => {
    if (cartItems) {
      setShowTotalHeader(cartItems.some((item) => item.qty > 1));
      calculateSubTotal(cartItems);
    }
  }, [cartItems]);

  if (loading) {
    return (
      <>
        <PageHeading text="SHOPPING CART" gutterBottom />
        <SkeletonCart />
      </>
    );
  }
  return (
    <>
      <PageHeading text="SHOPPING CART" gutterBottom />
      {error && (
        <AlertMessage message={error} severity="error" variant="outlined" />
      )}
      {cartItems === null ||
      cartItems === undefined ? null : cartItems.length <= 0 ? (
        <AlertMessage
          message="CART IS EMPTY"
          severity="info"
          variant="outlined"
        />
      ) : (
        <Grid container spacing={1} className={classes.root}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <Hidden xsDown>
                      <TableCell></TableCell>
                    </Hidden>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="center">Qty</TableCell>
                    {showTotalHeader && (
                      <Hidden xsDown>
                        <TableCell>Total</TableCell>
                      </Hidden>
                    )}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems?.map(
                    ({ id, name, price, imageUrl, countInStock, qty }) => {
                      return (
                        <TableRow key={id}>
                          <Hidden xsDown>
                            <TableCell>
                              <Paper className={classes.paper} elevation={0}>
                                <CardMedia
                                  className={classes.media}
                                  image={imageUrl || '/images/placeholder.jpg'}
                                  title={name}
                                />
                              </Paper>
                            </TableCell>
                          </Hidden>
                          <TableCell>{name}</TableCell>
                          <TableCell>
                            <strong>${price}</strong>
                          </TableCell>
                          <TableCell>
                            <FormControl variant="outlined">
                              <Select
                                className={classes.select}
                                native
                                onChange={(event) =>
                                  addToCartHandler(
                                    id,
                                    Number(event.target.value)
                                  )
                                }
                                value={qty}
                              >
                                {[...Array(countInStock).keys()].map((num) => (
                                  <option key={num} value={num + 1}>
                                    {num + 1}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          {showTotalHeader && (
                            <Hidden xsDown>
                              <TableCell>
                                {qty > 1 ? (
                                  <strong>${(price * qty).toFixed(2)}</strong>
                                ) : (
                                  ''
                                )}
                              </TableCell>
                            </Hidden>
                          )}
                          <TableCell>
                            <Tooltip
                              TransitionComponent={Zoom}
                              title="Remove item"
                            >
                              <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => removeFromCartHandler(id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} sm={7} xs={12}>
            <CartTotal
              subTotal={subTotal}
              totalQty={cartItems?.length}
              checkoutHandler={checkoutHandler}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Cart;
