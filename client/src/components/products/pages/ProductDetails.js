import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Reviews from '../components/Reviews';
import AlertMessage from '../../shared/ui/AlertMessage';
import ProductSummary from '../components/ProductSummary';

import { showProductDetails } from '../../../redux/actionCreators/productActionCreators';

import {
  SkeletonProductName,
  SkeletonProductDescription,
  SkeletonPrice,
  SkeletonRating,
  SkeletonMedia,
} from '../../shared/ui/skeletons/SkeletonComponents';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0',
    justifyContent: 'space-between',
    marginBottom: '150px',
  },
  backBtn: {
    '&:hover': {
      background: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  paper: {
    width: '100%',
    height: theme.spacing(45),
  },
  media: {
    width: '100%',
    height: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
}));

const ProductDetails = () => {
  const classes = useStyles();
  const pid = useParams().pid;
  const history = useHistory();

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const {
    name,
    imageUrl,
    description,
    price,
    countInStock,
    rating,
    numReviews,
  } = product || {};
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    history.push(`/cart/${product.id}?qty=${qty}`);
  };
  useEffect(() => {
    dispatch(showProductDetails(pid));
  }, [pid, dispatch]);

  return (
    <>
      <Button
        onClick={() => {
          history.goBack();
        }}
        className={classes.backBtn}
      >
        <Typography variant="button" gutterBottom paragraph>
          <strong>Go back</strong>
        </Typography>
      </Button>
      {error && (
        <AlertMessage message={error} severity="error" variant="outlined" />
      )}
      <Grid container spacing={2} className={classes.root}>
        <Grid item lg={5} sm={5} xs={12}>
          {product === undefined && (loading || loading === undefined) ? (
            <SkeletonMedia size="big" />
          ) : (
            <Paper className={classes.paper} variant="outlined" square>
              <CardMedia
                image={imageUrl || '/images/placeholder.jpg'}
                title={name}
                className={classes.media}
              />
            </Paper>
          )}
        </Grid>
        <Grid item lg={3} sm={6} xs={12} className={classes.details}>
          {product === undefined && (loading || loading === undefined) ? (
            <SkeletonProductName />
          ) : name !== null && name !== undefined ? (
            <Typography variant="h6" className={classes.name}>
              {name}
            </Typography>
          ) : (
            <AlertMessage
              fullWidth
              fetchFailed="name"
              severity="error"
              showTitle={false}
            />
          )}
          <Divider />
          {product === undefined && (loading || loading === undefined) ? (
            <SkeletonRating />
          ) : product &&
            rating !== null &&
            rating !== undefined &&
            numReviews !== null &&
            numReviews !== undefined ? (
            <Box className={classes.rating}>
              <Rating
                name="half-rating"
                value={rating}
                precision={1.0}
                readOnly
              />
              <Typography variant="subtitle2" color="textSecondary">
                {numReviews} reviews
              </Typography>
            </Box>
          ) : (
            <AlertMessage
              fullWidth
              fetchFailed="rating"
              severity="error"
              showTitle={false}
            />
          )}
          <Divider />
          {product === undefined && (loading || loading === undefined) ? (
            <SkeletonPrice />
          ) : price !== null && price !== undefined ? (
            <Typography variant="h5">
              $ <strong>{price}</strong>
            </Typography>
          ) : (
            <AlertMessage
              fullWidth
              fetchFailed="price"
              severity="error"
              showTitle={false}
            />
          )}
          <Divider />
          {product === undefined && (loading || loading === undefined) ? (
            <SkeletonProductDescription />
          ) : description !== null && description !== undefined ? (
            <Typography
              variant="subtitle1"
              align="justify"
              paragraph
              color="textSecondary"
              className={classes.description}
            >
              Description: {description}
            </Typography>
          ) : (
            <AlertMessage
              fullWidth
              fetchFailed="description"
              severity="error"
              showTitle={false}
            />
          )}
        </Grid>
        <Grid item lg={3} sm={12} xs={12}>
          <ProductSummary
            price={price}
            countInStock={countInStock}
            addToCartHandler={addToCartHandler}
            setQty={setQty}
          />
        </Grid>
      </Grid>
      {product && <Reviews product={product} />}
    </>
  );
};

export default ProductDetails;
