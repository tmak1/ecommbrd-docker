import React from 'react';

import ProductItem from './ProductItem';
import SortComp from './SortComp';
import ResultsPerPageComp from '../../shared/ui/ResultsPerPageComp';
import AlertMessage from '../../shared/ui/AlertMessage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '70px',
    '& a': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      margin: '0 auto',
    },
  },
}));

const ProductList = ({ products, perPage, setPerPage }) => {
  const classes = useStyles();
  return (
    <>
      <div style={{ display: 'flex', gap: '20px', float: 'right' }}>
        <SortComp />
        <ResultsPerPageComp perPage={perPage} setPerPage={setPerPage} />
      </div>

      {products.length > 0 ? (
        <Grid
          container
          direction="row"
          spacing={1}
          alignItems="center"
          className={classes.root}
        >
          {products.map(
            (product) =>
              product !== null &&
              product !== undefined && (
                <Grid item md={4} lg={3} key={product.id}>
                  <ProductItem product={product} />
                </Grid>
              )
          )}
        </Grid>
      ) : (
        <AlertMessage
          message="No products found"
          severity="info"
          variant="outlined"
        />
      )}
    </>
  );
};

export default ProductList;
