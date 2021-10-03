import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AccordianOrder from '../../shared/ui/AccordianOrder';
import AlertMessage from '../../shared/ui/AlertMessage';
import ErrorAlert from '../../shared/ui/ErrorAlert';
import PageHeading from '../../shared/ui/PageHeading';
import SkeletonCartBody from '../../shared/ui/skeletons/SkeletonCartBody';
import {
  SkeletonProductDescription,
  SkeletonPrice,
} from '../../shared/ui/skeletons/SkeletonComponents';
import OrderDetailsSummary from '../components/OrderDetailsSummary';
import { addressStringify, paymentMethodStringify } from '../../../helpers';

import { getOrderDetails } from '../../../redux/actionCreators/orderActionCreators';

import { dateFormatter } from '../../../helpers';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'flex-end',
    },
  },
  tableContainer: {
    borderBottom: 'none',
    boxShadow: 'none',
  },
  subRoot: {
    width: '70%',
    margin: theme.spacing(6, 'auto'),
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  rootTable: {
    borderBottom: 'none',
    boxShadow: 'none',
  },
  sections: {
    margin: theme.spacing(3, 0),
  },
  paper: {
    width: theme.spacing(10),
    height: theme.spacing(7),
  },
  media: {
    width: '100%',
    height: '100%',
  },
}));

const TableCell = withStyles({
  root: {
    textAlign: 'left',
    borderBottom: 'none',
    padding: '4px 8px',
  },
})(MuiTableCell);

const OrderDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orderId = useParams().oid;
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const {
    loggedInUser: { token },
  } = useSelector((state) => state.userAuth);
  const [selShipping, setSelShipping] = useState(null);
  const [selPayment, setSelPayment] = useState(null);
  const {
    id: newOrderId,
    buyerId: buyer,
    orderItems,
    shippingAddressId,
    paymentMethodId,
    tax,
    shippingCost,
    total,
    subTotal,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order || {};

  useEffect(() => {
    if (token) {
      dispatch(getOrderDetails(orderId, token));
    }
  }, [orderId, token, dispatch]);
  useEffect(() => {
    if (shippingAddressId) {
      const shipping = addressStringify(shippingAddressId);
      setSelShipping(shipping);
    }
  }, [shippingAddressId]);

  useEffect(() => {
    if (paymentMethodId) {
      const payment = paymentMethodStringify(paymentMethodId);
      setSelPayment(payment);
    }
  }, [paymentMethodId]);

  return (
    <div style={{ padding: '10px' }}>
      <PageHeading text="ORDER" paragraph size="big" />
      {loading ? (
        <SkeletonPrice />
      ) : (
        <PageHeading
          text={`#${newOrderId ? newOrderId : ''}`}
          paragraph
          size="medium"
        />
      )}
      {error && (
        <AlertMessage message={error} severity="error" variant="outlined" />
      )}
      <Grid container spacing={2} className={classes.root}>
        <Grid item md={8} sm={12} xs={12}>
          <div className={classes.subRoot}>
            {loading ? (
              <SkeletonPrice />
            ) : (
              <Typography variant="h6" paragraph>
                Thank you for your purchase!
              </Typography>
            )}
            {loading ? (
              <SkeletonProductDescription />
            ) : (
              order && (
                <TableContainer className={classes.tableContainer}>
                  <Table className={classes.rootTable}>
                    <TableBody>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        {loading ? (
                          <TableCell>
                            <SkeletonPrice width="100%" />
                          </TableCell>
                        ) : (
                          <TableCell>{buyer.name}</TableCell>
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        {loading ? (
                          <TableCell>
                            <SkeletonPrice width="100%" />
                          </TableCell>
                        ) : (
                          <TableCell>{buyer.email}</TableCell>
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell>Billing Address</TableCell>
                        {loading ? (
                          <TableCell>
                            <SkeletonPrice width="100%" />
                          </TableCell>
                        ) : (
                          <TableCell>
                            {addressStringify(buyer.billingAddress)}
                          </TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            )}
          </div>
          <Divider />
          <div className={classes.sections}>
            <PageHeading text="SHIPPING" paragraph size="small" />
            {loading ? (
              <SkeletonProductDescription />
            ) : (
              <AccordianOrder label={selShipping}>
                <div>
                  {!isDelivered ? (
                    <ErrorAlert
                      msg="Not yet delivered"
                      margin="0px"
                      padding="0px"
                      putErrorIcon={false}
                      fullWidth
                    />
                  ) : (
                    <ErrorAlert
                      msg={`Delivered on ${dateFormatter(deliveredAt)}`}
                      margin="0px"
                      padding="0px"
                      severity="success"
                      putErrorIcon={false}
                      fullWidth
                    />
                  )}
                </div>
              </AccordianOrder>
            )}
          </div>
          <Divider />
          <div className={classes.sections}>
            <PageHeading text="PAYMENT" paragraph size="small" />
            {loading ? (
              <SkeletonProductDescription />
            ) : (
              <AccordianOrder label={selPayment}>
                <div>
                  {!isPaid ? (
                    <ErrorAlert
                      msg="Not yet paid"
                      margin="0px"
                      padding="0px"
                      putErrorIcon={false}
                      fullWidth
                    />
                  ) : (
                    <ErrorAlert
                      msg={`Paid on ${dateFormatter(paidAt)}`}
                      margin="0px"
                      padding="0px"
                      severity="success"
                      putErrorIcon={false}
                      fullWidth
                    />
                  )}
                </div>
              </AccordianOrder>
            )}
          </div>
          <Divider />
          <div className={classes.sections}>
            <PageHeading text="ORDER ITEMS" paragraph size="medium" />
            {loading && <SkeletonCartBody />}
            {order && (
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
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderItems?.map(
                      ({ productId: { id, name, price, imageUrl }, qty }) => {
                        return (
                          <TableRow key={id}>
                            <Hidden xsDown>
                              <TableCell>
                                <Paper className={classes.paper} elevation={0}>
                                  <CardMedia
                                    className={classes.media}
                                    image={
                                      imageUrl || '/images/placeholder.jpg'
                                    }
                                    title={name}
                                  />
                                </Paper>
                              </TableCell>
                            </Hidden>
                            <TableCell>{name}</TableCell>
                            <TableCell>
                              <strong>${price}</strong>
                            </TableCell>
                            <TableCell>{qty}</TableCell>
                            <TableCell>
                              <strong>{`$${total.toFixed(2)}`}</strong>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <OrderDetailsSummary
            loading={loading}
            total={total?.toFixed(2)}
            tax={tax?.toFixed(2)}
            shippingCost={shippingCost?.toFixed(2)}
            subTotal={subTotal?.toFixed(2)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetails;
