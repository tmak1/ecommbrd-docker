import {
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILURE,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
  USER_ORDER_LIST_FAILURE,
  PRODUCT_ORDER_LIST_REQUEST,
  PRODUCT_ORDER_LIST_SUCCESS,
  PRODUCT_ORDER_LIST_FAILURE,
  PRODUCT_ORDER_BY_USER_REQUEST,
  PRODUCT_ORDER_BY_USER_SUCCESS,
  PRODUCT_ORDER_BY_USER_FAILURE,
  UPDATE_ORDER_ISDELIVERED_REQUEST,
  UPDATE_ORDER_ISDELIVERED_SUCCESS,
  UPDATE_ORDER_ISDELIVERED_FAILURE,
} from '../actions/orderActions';
import { sendRequest } from '../../helpers';

const updateLocalStorage = (item, key) => {
  let shoppingapp = localStorage.getItem('shoppingapp');
  if (shoppingapp) {
    shoppingapp = JSON.parse(shoppingapp);
    if (item?.length > 0) {
      return localStorage.setItem(
        'shoppingapp',
        JSON.stringify({ ...shoppingapp, [key]: item })
      );
    }
    delete shoppingapp[key];
    return localStorage.setItem('shoppingapp', JSON.stringify(shoppingapp));
  }
  if (item) {
    localStorage.setItem('shoppingapp', JSON.stringify({ [key]: item }));
  }
};

export const placeOrder =
  ({
    shippingAddressId,
    paymentMethodId,
    orderItems,
    paymentResult,
    token,
    tax,
    shippingCost,
    total,
    subTotal,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    onSuccess,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PLACE_ORDER_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/orders/new`,
        'POST',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify({
          shippingAddressId,
          paymentMethodId,
          paymentResult,
          orderItems,
          tax,
          shippingCost,
          total,
          subTotal,
          isPaid,
          paidAt,
          isDelivered,
          deliveredAt,
        })
      );
      if (error) {
        dispatch({ type: PLACE_ORDER_FAILURE, payload: error });
      }
      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: { msg: 'success', id: data?.id },
      });
      onSuccess(getState().orderCreated.order.id);
      //updateLocalStorage(getState().checkout.placeOrder, 'order');
    } catch (error) {
      console.log(error);
    }
  };

export const getOrderDetails =
  (orderId, token) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/orders/${orderId}`,
        'GET',
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (error) {
        dispatch({ type: ORDER_DETAILS_FAILURE, payload: error });
      }
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
      //updateLocalStorage(getState().checkout.placeOrder, 'order');
    } catch (error) {
      console.log(error);
    }
  };

export const getOrderList = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { error, data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/orders`,
      'GET',
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (error) {
      dispatch({ type: ORDER_LIST_FAILURE, payload: error });
    }
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    //updateLocalStorage(getState().checkout.placeOrder, 'order');
    updateLocalStorage(getState().orderList.orders, 'order');
  } catch (error) {
    console.log(error);
  }
};

export const getOrderListByUser =
  (userId, token, searchTerm = '', page = '', perPage = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_ORDER_LIST_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/orders/users/${userId}?orderId=${searchTerm}&page=${page}&perPage=${perPage}`,
        'GET',
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (error) {
        dispatch({ type: USER_ORDER_LIST_FAILURE, payload: error });
      }
      dispatch({ type: USER_ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getOrderListByProduct =
  (productId, token, searchTerm = '', page = '', perPage = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_ORDER_LIST_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/orders/products/${productId}?orderId=${searchTerm}&page=${page}&perPage=${perPage}`,
        'GET',
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (error) {
        dispatch({ type: PRODUCT_ORDER_LIST_FAILURE, payload: error });
      }
      dispatch({ type: PRODUCT_ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getProductOrderByUser =
  (productId, token) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_ORDER_BY_USER_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/orders/products/${productId}`,
        'GET',
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (error) {
        dispatch({ type: PRODUCT_ORDER_BY_USER_FAILURE, payload: error });
      }
      dispatch({ type: PRODUCT_ORDER_BY_USER_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const updateOrderIsDelivered =
  (orderId, token, updateInfo, onSuccess = () => {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_ORDER_ISDELIVERED_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/orders/${orderId}`,
        'PATCH',
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        JSON.stringify(updateInfo)
      );
      if (error) {
        dispatch({ type: UPDATE_ORDER_ISDELIVERED_FAILURE, payload: error });
      }
      dispatch({ type: UPDATE_ORDER_ISDELIVERED_SUCCESS, payload: data });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
