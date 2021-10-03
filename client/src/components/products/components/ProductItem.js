import React from 'react';
import { Link } from 'react-router-dom';

import AlertMessage from '../../shared/ui/AlertMessage';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(30),
    height: theme.spacing(50),
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateRows: '7fr 1fr',
  },
  media: {
    height: '100%',
  },
  actions: {
    display: 'flex',
    padding: '0',
  },
}));

const ProductItem = ({
  product: { id, name, imageUrl, price, rating, numReviews },
}) => {
  const classes = useStyles();
  return (
    <Link to={`/products/${id}`}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={imageUrl || '/images/placeholder.jpg'}
          title={name}
        />
        <CardContent>
          {name ? (
            <Typography variant="body2" align="left" gutterBottom paragraph>
              {name}
            </Typography>
          ) : (
            <AlertMessage
              small
              fetchFailed="name"
              severity="error"
              showTitle={false}
            />
          )}
          {price !== null && price !== undefined ? (
            <Typography variant="h6" align="left" gutterBottom>
              $ <strong>{price}</strong>
            </Typography>
          ) : (
            <AlertMessage
              small
              fetchFailed="price"
              severity="error"
              showTitle={false}
            />
          )}
          <CardActions className={classes.actions}>
            <Rating
              name="half-rating"
              value={rating}
              precision={1.0}
              readOnly
            />
            <Typography variant="subtitle2" color="textSecondary">
              {numReviews}
            </Typography>
          </CardActions>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
