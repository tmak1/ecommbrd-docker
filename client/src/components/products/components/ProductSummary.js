import React from 'react';

import BigButton from '../../shared/ui/BigButton';
import {
  SkeletonPrice,
  SkeletonCountInStock,
} from '../../shared/ui/skeletons/SkeletonComponents';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      margin: '0 auto',
    },
  },
}));

const ProductSummary = ({ price, countInStock, addToCartHandler, setQty }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>
              {price === null || price === undefined ? (
                <SkeletonPrice />
              ) : (
                <Typography variant="h6">
                  $ <strong> {price}</strong>
                </Typography>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>
              {countInStock === null || countInStock === undefined ? (
                <SkeletonCountInStock />
              ) : countInStock > 0 ? (
                `${countInStock} in Stock`
              ) : (
                'Out of Stock'
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Qty</TableCell>
            <TableCell>
              <FormControl variant="outlined">
                <Select native onChange={(event) => setQty(event.target.value)}>
                  {!!countInStock &&
                    countInStock > 0 &&
                    [...Array(countInStock).keys()].map((num) => (
                      <option key={num} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <BigButton disabled={!countInStock} onClick={addToCartHandler}>
                ADD TO CART
              </BigButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductSummary;
