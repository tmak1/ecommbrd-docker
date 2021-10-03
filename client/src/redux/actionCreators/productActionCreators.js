import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  TOP_PRODUCT_LIST_REQUEST,
  TOP_PRODUCT_LIST_SUCCESS,
  TOP_PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_LIST_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_UPDATE_BYADMIN_REQUEST,
  PRODUCT_UPDATE_BYADMIN_SUCCESS,
  PRODUCT_UPDATE_BYADMIN_FAILURE,
} from '../actions/productActions';
import { sendRequest } from '../../helpers';

export const listProducts =
  (searchTerm, rating, page, perPage, filters, sort) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/products?search=${searchTerm}&rating=${rating}&page=${page}&perPage=${perPage}&filters=${filters}&sort=${sort}`
      );
      error
        ? dispatch({ type: PRODUCT_LIST_FAILURE, payload: error })
        : dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCT_LIST_REQUEST });
    const { error, data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/products/top`
    );
    error
      ? dispatch({ type: TOP_PRODUCT_LIST_FAILURE, payload: error })
      : dispatch({ type: TOP_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const showProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { error, data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/products/${productId}`
    );
    error
      ? dispatch({ type: PRODUCT_DETAILS_FAILURE, payload: error })
      : dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const listAdminProducts =
  (userId, token, searchTerm = '', page = '', perPage = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_LIST_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/products/users/${userId}?productId=${searchTerm}&page=${page}&perPage=${perPage}`,
        'GET',
        {
          Authorization: `Bearer ${token}`,
        }
      );
      error
        ? dispatch({ type: ADMIN_PRODUCT_LIST_FAILURE, payload: error })
        : dispatch({ type: ADMIN_PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const createProduct =
  (token, createInfo, onSuccess = () => {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/products`,
        'POST',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(createInfo)
      );
      if (error) {
        return dispatch({
          type: PRODUCT_CREATE_FAILURE,
          payload: error,
        });
      }
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

export const deleteProduct =
  (productId, token, onSuccess) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/products/${productId}`,
        'DELETE',
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (error) {
        return dispatch({ type: PRODUCT_DELETE_FAILURE, payload: error });
      }
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

export const updateProductByAdmin =
  (productId, token, updateInfo, onSuccess = () => {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_BYADMIN_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/products/${productId}`,
        'PATCH',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(updateInfo)
      );
      if (error) {
        return dispatch({
          type: PRODUCT_UPDATE_BYADMIN_FAILURE,
          payload: error,
        });
      }
      dispatch({ type: PRODUCT_UPDATE_BYADMIN_SUCCESS, payload: data });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
