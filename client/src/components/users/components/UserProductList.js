import React from 'react';
import { Link as Rlink } from 'react-router-dom';

import TablePaginationComp from '../../shared/ui/TablePaginationComp';
import AlertMessage from '../../shared/ui/AlertMessage';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import DeleteOutlineIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      color: 'blue',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.white,
    color: theme.palette.common.black,
    border: '1px solid rgba(0,0,0,0.08)',
  },
  body: {
    fontSize: theme.spacing(2),
    border: '1px solid rgba(0,0,0,0.08)',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const UserProductList = ({
  productInfo,
  handleOperation,
  handlePageChange,
  handlePerPageChange,
}) => {
  const classes = useStyles();
  return (
    <>
      {(
        productInfo.products === null || productInfo?.products === undefined
          ? null
          : productInfo?.products.length <= 0
      ) ? (
        <AlertMessage
          message="No products found"
          severity="info"
          variant="outlined"
        />
      ) : (
        <TableContainer>
          <Table style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>PRODUCT ID</StyledTableCell>
                <StyledTableCell>NAME</StyledTableCell>
                <StyledTableCell>PRICE</StyledTableCell>
                <StyledTableCell>CATEGORY</StyledTableCell>
                <StyledTableCell>BRAND</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productInfo?.products?.map((product) => {
                return (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="All orders of this product"
                      >
                        <Link
                          className={classes.link}
                          component={Rlink}
                          to={`/orders/products/${product.id}`}
                          variant="body1"
                          color="inherit"
                        >
                          {product.id}
                        </Link>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell>{product.name}</StyledTableCell>
                    <StyledTableCell>$ {product.price}</StyledTableCell>
                    <StyledTableCell>{product.category}</StyledTableCell>
                    <StyledTableCell>{product.brand}</StyledTableCell>
                    <StyledTableCell style={{ textAlign: 'center' }}>
                      <Tooltip TransitionComponent={Zoom} title="Edit">
                        <IconButton
                          onClick={() => handleOperation('update', product)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip TransitionComponent={Zoom} title="Delete">
                        <IconButton
                          onClick={() => handleOperation('delete', product)}
                        >
                          <DeleteOutlineIcon
                            style={{
                              color: '#FF4D4D',
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
            {productInfo && (
              <TablePaginationComp
                colSpan={6}
                itemInfo={productInfo}
                handlePageChange={handlePageChange}
                handlePerPageChange={handlePerPageChange}
              />
            )}
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserProductList;
