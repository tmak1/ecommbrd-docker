import React, { useState, useEffect } from 'react';
import { Link as Rlink } from 'react-router-dom';

import DecisionDialog from '../../shared/ui/DecisionDialog';

import { dateFormatter } from '../../../helpers';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';

import DeleteIcon from '@material-ui/icons/Delete';
import { deleteProductReview } from '../../../redux/actionCreators/reviewActionCreators';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& li': {
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      },
    },
  },
  block: {
    display: 'block',
    width: '100%',
  },
  link: {
    '&:hover': {
      color: 'blue',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  iconButton: {
    marginRight: theme.spacing(8),
    color: 'grey',
    '&:hover': {
      color: '#fff',
    },
    '&.active': {
      color: '#fff',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  productDetails: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  },
}));

const ReviewList = ({ reviews, loggedInUser, refreshReviews, userReview }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState();
  const deleteReview = (reviewId) => {
    setReviewIdToDelete(reviewId);
  };
  const onSuccess = () => {
    refreshReviews();
  };
  const handleRemove = () => {
    if (reviewIdToDelete) {
      dispatch(
        deleteProductReview(reviewIdToDelete, loggedInUser?.token, onSuccess)
      );
    }
  };
  useEffect(() => {
    if (reviewIdToDelete) {
      setDialogOpen(true);
    }
  }, [reviewIdToDelete]);

  return (
    <>
      <DecisionDialog
        open={dialogOpen}
        title="Delete Review"
        content="This will delete the review"
        actionBtnText="Delete"
        setDialogOpen={setDialogOpen}
        handleAction={handleRemove}
      />
      <List className={classes.root}>
        {reviews.map((review) => {
          return (
            <li key={review.id} style={{ marginBottom: '30px' }}>
              <ListItem component="div">
                <ListItemText
                  className={classes.block}
                  primary={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="All reviews by this user"
                      >
                        <Link
                          className={classes.link}
                          component={Rlink}
                          to={`/reviews/users/${review.userId.id}`}
                          variant="h6"
                          color="inherit"
                        >
                          {review.userId.name}
                        </Link>
                      </Tooltip>
                      {loggedInUser?.user.isAdmin && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                          }}
                        >
                          <Typography
                            style={{ marginLeft: '20px' }}
                            variant="caption"
                            color="textPrimary"
                          >
                            <em>{review.userId.email}</em>
                          </Typography>
                          <Tooltip
                            TransitionComponent={Zoom}
                            title="Delete Review"
                          >
                            <IconButton
                              color="inherit"
                              size="small"
                              onClick={() => deleteReview(review.id)}
                            >
                              <DeleteIcon style={{ color: 'red' }} />
                            </IconButton>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  }
                  secondary={
                    <>
                      <Rating value={review.rating} precision={1.0} readOnly />
                      <Typography
                        variant="caption"
                        className={classes.block}
                        color="textPrimary"
                      >
                        <em>
                          {review.comment === '' ? 'Reviewed' : 'Rated'} on{' '}
                          {dateFormatter(review.updatedAt)}
                        </em>
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {userReview && (
                <ListItem component="div">
                  <ListItemText
                    primary={
                      <span
                        style={{
                          display: 'block',
                          width: '180px',
                          height: '160px',
                        }}
                      >
                        <img
                          src={review.productId.imageUrl}
                          alt={review.productId.name}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </span>
                    }
                    secondary={
                      <span style={{ display: 'block', marginTop: '20px' }}>
                        <span>
                          <Tooltip
                            TransitionComponent={Zoom}
                            title="product details"
                          >
                            <Link
                              className={classes.link}
                              to={`/products/${review.productId.id}`}
                              component={Rlink}
                              variant="body2"
                              color="inherit"
                            >
                              <span>{review.productId.name}</span>
                            </Link>
                          </Tooltip>
                        </span>
                        <span className={classes.productDetails}>
                          <span>$ {review.productId.price}</span>
                          <span>Category: {review.productId.category}</span>
                        </span>
                      </span>
                    }
                  />
                </ListItem>
              )}
              {review.comment && (
                <ListItem component="div">
                  <ListItemText
                    className={classes.block}
                    primary={
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        align="justify"
                      >
                        {review.comment}
                      </Typography>
                    }
                  />
                </ListItem>
              )}
              <Divider style={{ marginTop: '10px' }} />
            </li>
          );
        })}
      </List>
    </>
  );
};

export default ReviewList;
