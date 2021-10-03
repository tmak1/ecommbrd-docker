import React, { useEffect, useContext, useState } from 'react';
import { Link as Rlink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TopProducts from '../components/TopProducts';
import RatingSort from '../components/RatingSort';
import ProductList from '../components/ProductList';
import PageHeading from '../../shared/ui/PageHeading';
import FilterTree from '../../shared/ui/FilterTree';
import AlertMessage from '../../shared/ui/AlertMessage';
import PaginationComp from '../../shared/ui/PaginationComp';

import { ProductMetaDataContext } from '../../shared/contexts/ProductMetaDataContextProvider';

import { listProducts } from '../../../redux/actionCreators/productActionCreators';

import SkeletonProductList from '../../shared/ui/skeletons/SkeletonProductList';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  controls: {
    marginBottom: '55px',
    marginLeft: '20px',
    width: '75%',
    display: 'flex',
    float: 'right',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down(400)]: {
      float: 'left',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
}));

const Product = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [jumbotronOpen, setJumbotronOpen] = useState(true);
  const {
    searchTerm,
    page,
    setPage,
    perPage,
    setPerPage,
    filters,
    setFilters,
    sort,
    rating,
    setRating,
  } = useContext(ProductMetaDataContext) || {};

  const { loading, error, productInfo } = useSelector(
    (state) => state.productsList
  );
  useEffect(() => {
    dispatch(listProducts(searchTerm, rating, page, perPage, filters, sort));
    !searchTerm || searchTerm?.trim() === ''
      ? setJumbotronOpen(true)
      : setJumbotronOpen(false);
  }, [searchTerm, rating, page, perPage, filters, sort, dispatch]);

  return (
    <>
      <PageHeading text="LATEST PRODUCTS" paragraph marginBottom="70px" />
      {jumbotronOpen ? (
        <TopProducts setJumbotronOpen={setJumbotronOpen} />
      ) : (
        <div className={classes.controls}>
          <Link component={Rlink} to="/products" variant="button">
            <strong>Go back</strong>
          </Link>
          <Button
            variant="outlined"
            onClick={() => setJumbotronOpen(true)}
            style={{ margin: '40px 0' }}
          >
            Featured
          </Button>
        </div>
      )}
      <Grid
        container
        justifyContent="space-between"
        spacing={1}
        alignItems="flex-start"
      >
        <Grid item xs={12} md={2}>
          <div style={{ display: 'flex' }}>
            <div>
              <FilterTree
                reset={filters?.length === 0 ? true : false}
                setFilters={setFilters}
              />
              <RatingSort rating={rating} setRating={setRating} />
            </div>
            <Hidden mdDown>
              <Divider
                orientation="vertical"
                style={{ minHeight: '140vh', margin: '0 20px' }}
              />
            </Hidden>
          </div>
        </Grid>
        <Grid item xs={12} md={10}>
          {loading && <SkeletonProductList productCount={8} />}
          {error && (
            <AlertMessage message={error} severity="error" variant="outlined" />
          )}
          {productInfo?.products && (
            <ProductList
              products={productInfo?.products}
              perPage={perPage}
              setPerPage={setPerPage}
            />
          )}
          {productInfo && (
            <PaginationComp
              page={page}
              pages={productInfo?.pages}
              setPage={setPage}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
