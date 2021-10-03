import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ReviewList from '../components/ReviewList';
import PageHeading from '../../shared/ui/PageHeading';
import AlertMessage from '../../shared/ui/AlertMessage';

import { getAllUserReviews } from '../../../redux/actionCreators/reviewActionCreators';
import SkeletonReviews from '../../shared/ui/skeletons/SkeletonReviews';

const Reviews = ({ userId }) => {
  const dispatch = useDispatch();
  const userIdFromUrl = useParams().uid;
  const { loggedInUser } = useSelector((state) => state.userAuth);
  const { loading, error, reviews } = useSelector(
    (state) => state.userReviews || {}
  );
  const refreshReviews = () => {
    dispatch(getAllUserReviews(userId || userIdFromUrl));
  };

  useEffect(() => {
    dispatch(getAllUserReviews(userId || userIdFromUrl));
  }, [userId, userIdFromUrl, dispatch]);

  return (
    <>
      <div>
        {loading && <SkeletonReviews userreviews={true} />}
        {error && (
          <AlertMessage message={error} severity="error" variant="outlined" />
        )}
        {!loading && !error ? (
          <>
            <PageHeading size="medium" text="Reviews" gutterBottom />
            {reviews?.length > 0 ? (
              <ReviewList
                reviews={reviews}
                loggedInUser={loggedInUser}
                userReview={true}
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
