import React from 'react';

import { SkeletonPrice } from '../../shared/ui/skeletons/SkeletonComponents';

import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import { PayPalButton } from 'react-paypal-button-v2';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      width: '70%',
      margin: '0 auto',
    },
  },
  tableTitle: {
    backgroundColor: '#2c3033',
    color: 'white',
    fontWeight: 'bolder',
    fontSize: '1rem',
    textAlign: 'center',
  },
}));
const OrderSummary = ({
  loading,
  total,
  tax,
  shippingCost,
  subTotal,
  disable,
  handleClick,
}) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} className={classes.tableTitle}>
              SUMMARY
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Items</TableCell>
            {loading ? (
              <TableCell>
                <SkeletonPrice width="100%" />
              </TableCell>
            ) : (
              <TableCell>$ {total}</TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Shipping</TableCell>
            {loading ? (
              <TableCell>
                <SkeletonPrice width="100%" />
              </TableCell>
            ) : (
              <TableCell>$ {shippingCost}</TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            {loading ? (
              <TableCell>
                <SkeletonPrice width="100%" />
              </TableCell>
            ) : (
              <TableCell>$ {tax}</TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            {loading ? (
              <TableCell>
                <SkeletonPrice width="100%" />
              </TableCell>
            ) : (
              <TableCell>$ {subTotal}</TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <PayPalButton
                amount={subTotal}
                onSuccess={handleClick}
                onError={(error) => console.log(error)}
                disabled={disable}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderSummary;
