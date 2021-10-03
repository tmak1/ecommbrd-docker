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

import { sendRequest } from '../../helpers';

export const getAllProductReviews =
  (productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/reviews/products/${productId}`
      );
      error
        ? dispatch({ type: PRODUCT_REVIEW_FAILURE, payload: error })
        : dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getAllUserReviews = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REVIEW_REQUEST });
    const { error, data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/reviews/users/${userId}`
    );
    error
      ? dispatch({ type: USER_REVIEW_FAILURE, payload: error })
      : dispatch({ type: USER_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProductReview =
  (productId, token, createInfo, onSuccess = () => {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: REVIEW_CREATE_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/reviews/products/${productId}`,
        'POST',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(createInfo)
      );
      if (error) {
        return dispatch({
          type: REVIEW_CREATE_FAILURE,
          payload: error,
        });
      }
      dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

export const deleteProductReview =
  (reviewId, token, onSuccess) => async (dispatch, getState) => {
    try {
      dispatch({ type: REVIEW_DELETE_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`,
        'DELETE',
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (error) {
        return dispatch({ type: REVIEW_DELETE_FAILURE, payload: error });
      }
      dispatch({ type: REVIEW_DELETE_SUCCESS, payload: data });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
