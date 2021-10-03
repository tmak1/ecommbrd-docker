import {
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAILURE,
  USER_REVIEW_REQUEST,
  USER_REVIEW_SUCCESS,
  USER_REVIEW_FAILURE,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAILURE,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DELETE_FAILURE,
} from '../actions/reviewActions';

export const getAllProductReviewsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SUCCESS:
      return { loading: false, reviews: payload };
    case PRODUCT_REVIEW_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const getAllUserReviewsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REVIEW_REQUEST:
      return { loading: true };
    case USER_REVIEW_SUCCESS:
      return { loading: false, reviews: payload };
    case USER_REVIEW_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const createReviewReducer = (state = null, { type, payload }) => {
  switch (type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true };
    case REVIEW_CREATE_SUCCESS:
      return { loading: false, product: payload };
    case REVIEW_CREATE_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const deleteReviewReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case REVIEW_DELETE_REQUEST:
      return { loading: true };
    case REVIEW_DELETE_SUCCESS:
      return { loading: false, review: payload };
    case REVIEW_DELETE_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
