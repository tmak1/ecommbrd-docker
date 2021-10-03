import React from 'react';

import BigButton from '../../shared/ui/BigButton';

import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0',
    marginTop: '10px',
    border: '1px solid silver',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      margin: theme.spacing(3, 'auto'),
    },
  },
}));

const CartTotal = ({ subTotal = 0, totalQty = 0, checkoutHandler }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.root}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} align="center">
              SUBTOTAL ({totalQty}) ITEMS
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} align="center">
              $ <strong>{subTotal}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <BigButton
                variant="contained"
                disableElevation
                className={classes.checkoutBtn}
                onClick={checkoutHandler}
              >
                Continue
              </BigButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTotal;
