import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import PageHeading from '../../shared/ui/PageHeading';
import AlertMessage from '../../shared/ui/AlertMessage';

import { getAllProductReviews } from '../../../redux/actionCreators/reviewActionCreators';
import { getProductOrderByUser } from '../../../redux/actionCreators/orderActionCreators';
import SkeletonReviews from '../../shared/ui/skeletons/SkeletonReviews';

const Reviews = ({ product }) => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.userAuth);
  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews || {}
  );
  const {
    loading: loading2,
    error: error2,
    orderExists,
  } = useSelector((state) => state.orderForProductByUser || {});

  const refreshReviews = () => {
    dispatch(getAllProductReviews(product.id));
  };

  useEffect(() => {
    dispatch(getAllProductReviews(product.id));
  }, [product?.id, dispatch]);

  useEffect(() => {
    if (loggedInUser?.token) {
      dispatch(getProductOrderByUser(product?.id, loggedInUser?.token));
    }
  }, [reviews, dispatch, loggedInUser?.token, product.id]);

  return (
    <>
      <div>
        {(loading || loading2) && <SkeletonReviews userreviews={false} />}
        {(error || error2) && (
          <AlertMessage
            message={error || error2}
            severity="error"
            variant="outlined"
          />
        )}
        {!loading && !loading2 && !error && !error2 ? (
          <>
            {((loggedInUser?.token && orderExists) ||
              loggedInUser?.user?.isAdmin) && (
              <ReviewForm
                loggedInUser={loggedInUser}
                product={product}
                review={reviews?.find(
                  (review) => review?.userId._id === loggedInUser?.user.id
                )}
                refreshReviews={refreshReviews}
              />
            )}
            <PageHeading size="medium" text="Reviews" />
            {reviews?.length > 0 ? (
              <ReviewList
                reviews={reviews}
                loggedInUser={loggedInUser}
                userreview={false}
                refreshReviews={refreshReviews}
              />
            ) : (
              <div>No reviews yet</div>
            )}
          </>
        ) : null}
      </div>
    </>
  );
};

export default Reviews;
