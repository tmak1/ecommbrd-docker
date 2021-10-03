import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PlaceOrderSummary from '../components/PlaceOrderSummary';
import AlertMessage from '../../shared/ui/AlertMessage';
import LoadingLinear from '../../shared/ui/LoadingLinear';
import PageHeading from '../../shared/ui/PageHeading';
import SkeletonCartBody from '../../shared/ui/skeletons/SkeletonCartBody';
import {
  SkeletonPrice,
  SkeletonProductDescription,
} from '../../shared/ui/skeletons/SkeletonComponents';
import { addressStringify, paymentMethodStringify } from '../../../helpers';

import {
  addToCart,
  removeFromCart,
} from '../../../redux/actionCreators/cartActionCreators';

import { placeOrder } from '../../../redux/actionCreators/orderActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(8, 0),
    marginBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'flex-end',
    },
  },
  paper: {
    width: theme.spacing(10),
    height: theme.spacing(7),
  },
  media: {
    width: '100%',
    height: '100%',
  },
  subRoot: {
    margin: theme.spacing(6, 0),
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

const PlaceOrder = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [newOrderId, setNewOrderId] = useState(null);
  const {
    loggedInUser: { user, token },
  } = useSelector((state) => state.userAuth);
  const {
    loading: cartLoading,
    error: cartError,
    cartItems,
  } = useSelector((state) => state.cart);
  const {
    loading: shippingLoading,
    shippingError,
    selectedshipping,
  } = useSelector((state) => state.checkout);
  const {
    loading: paymentLoading,
    paymentError,
    selectedpayment,
  } = useSelector((state) => state.checkout);
  const [selShipping, setSelShipping] = useState(null);
  const [selPayment, setSelPayment] = useState(null);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);
  const [SDKReady, setSDKReady] = useState(false);

  const addToCartHandler = useCallback(
    (pid, qty) => {
      dispatch(addToCart(pid, qty));
    },
    [dispatch]
  );
  const removeFromCartHandler = (pid) => {
    dispatch(removeFromCart(pid));
  };
  const calculateTotal = useCallback(() => {
    const total = cartItems.reduce((acc, product) => {
      return product.price * product.qty + acc;
    }, 0);
    setTotal(total);
  }, [cartItems]);
  const calculateTax = useCallback(() => {
    let taxPercentage = 10;
    const tax = total * (taxPercentage / 100.0);
    setTax(tax);
  }, [total]);
  const calculateShippingCost = useCallback(() => {
    switch (true) {
      case cartItems.length <= 0:
        setShippingCost(0);
        break;
      case cartItems.length > 20:
        setShippingCost(0);
        break;
      case cartItems.length > 10 && cartItems.length <= 20:
        setShippingCost(15);
        break;
      case cartItems.length < 10:
        setShippingCost(25);
        break;
      default:
        setShippingCost(0);
        break;
    }
  }, [cartItems?.length]);
  const calculateSubTotal = useCallback(() => {
    const subTotal = total + tax + shippingCost;
    setSubTotal(subTotal);
  }, [shippingCost, tax, total]);

  const onSuccess = (newOrderId) => {
    if (newOrderId) {
      setNewOrderId(newOrderId);
    }
  };
  const handlePlaceOrder = (paymentData) => {
    const modifiedCartItems = cartItems.map((item) => {
      const newItem = { ...item, productId: item.id };
      delete newItem.id;
      delete newItem.creatorId;
      delete newItem.name;
      delete newItem.price;
      delete newItem.imageUrl;
      delete newItem.rating;
      delete newItem.numReviews;
      delete newItem.reviewIds;
      delete newItem.countInStock;
      delete newItem.description;
      delete newItem.brand;
      delete newItem.category;
      return newItem;
    });

    const paymentResult = {
      payId: paymentData.id,
      status: paymentData.status,
      update_time: paymentData.update_time,
      email_address: paymentData.payer.email_address,
      amount: paymentData.purchase_units[0].amount.value,
    };

    const values = {
      shippingAddressId: selectedshipping.id,
      paymentMethodId: selectedpayment.id,
      orderItems: modifiedCartItems,
      buyer: user,
      paymentResult,
      token,
      tax,
      shippingCost,
      total,
      subTotal,
      isPaid: true,
      paidAt: new Date(),
      isDelivered: false,
      deliveredAt: null,
      onSuccess,
    };
    // console.log('values: ', values);
    dispatch(placeOrder(values));
  };

  const addPaypalScript = useCallback(async () => {
    let script;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/orders/paypalConfig`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { clientId } = await res.json();
      script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&disable-funding=credit,card&commit=true`;
      script.type = 'text/javascript';
      script.async = true;
      document.body.append(script);
      script.onload = () => setSDKReady(true);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    (async () => {
      if (token) {
        await addPaypalScript();
      }
    })();
  }, [token, addPaypalScript]);

  useEffect(() => {
    if (
      !token ||
      !cartItems ||
      !selectedshipping ||
      !selectedpayment ||
      (cartItems && cartItems.length <= 0)
    ) {
      setDisableBtn(true);
    }
  }, [token, cartItems, selectedshipping, selectedpayment]);

  useEffect(() => {
    if (selectedshipping) {
      const shipping = addressStringify(selectedshipping);
      setSelShipping(shipping);
    }
  }, [selectedshipping]);

  useEffect(() => {
    if (selectedpayment) {
      const payment = paymentMethodStringify(selectedpayment);
      setSelPayment(payment);
    }
  }, [selectedpayment]);

  useEffect(() => {
    calculateTotal();
    calculateShippingCost();
  }, [cartItems, calculateTotal, calculateShippingCost]);

  useEffect(() => {
    calculateTax();
  }, [total, calculateTax]);

  useEffect(() => {
    calculateSubTotal();
  }, [total, tax, shippingCost, calculateSubTotal]);

  useEffect(() => {
    if (newOrderId) {
      history.push(`/orders/${newOrderId}`);
    }
  }, [newOrderId, history]);

  if (!SDKReady) {
    return <LoadingLinear />;
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item md={8} sm={12} xs={12}>
        <div className={classes.subRoot}>
          <PageHeading text="SHIPPING ADDRESS" paragraph size="medium" />
          {shippingLoading && <SkeletonProductDescription />}
          {shippingError && (
            <AlertMessage
              message={shippingError}
              severity="error"
              variant="outlined"
            />
          )}
          <Typography paragraph gutterBottom>
            {selShipping}
          </Typography>
          <Divider />
        </div>
        <div className={classes.subRoot}>
          <PageHeading text="PAYMENT METHOD" paragraph size="medium" />
          {paymentLoading && <SkeletonPrice />}
          {paymentError && (
            <AlertMessage
              message={paymentError}
              severity="error"
              variant="outlined"
            />
          )}
          <Typography paragraph gutterBottom>
            {selPayment}
          </Typography>
          <Divider />
        </div>
        <div>
          <PageHeading text="ORDER ITEMS" paragraph size="medium" />
          {cartLoading && <SkeletonCartBody />}
          {cartError && (
            <AlertMessage
              message={cartError}
              severity="error"
              variant="outlined"
            />
          )}
          {cartItems?.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <Hidden xsDown>
                      <TableCell></TableCell>
                    </Hidden>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty</TableCell>
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
                            <span>
                              {`${qty} x $${price} = `}
                              <strong>{`$${total.toFixed(2)}`}</strong>
                            </span>
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
          ) : (
            <AlertMessage message="Cart is empty" severity="info" />
          )}
        </div>
      </Grid>
      <Grid item md={3} sm={12} xs={12}>
        <PlaceOrderSummary
          loading={cartLoading || shippingLoading || paymentLoading}
          total={total?.toFixed(2)}
          tax={tax?.toFixed(2)}
          shippingCost={shippingCost?.toFixed(2)}
          subTotal={subTotal?.toFixed(2)}
          disable={disableBtn}
          handleClick={handlePlaceOrder}
        />
      </Grid>
    </Grid>
  );
};

export default PlaceOrder;
