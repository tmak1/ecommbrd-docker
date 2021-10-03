import * as req from '../actions/paymentActions';
import { sendRequest } from '../../helpers';

const clearLocalStorage = (props) => {
  let shoppingapp = localStorage.getItem('shoppingapp');
  if (shoppingapp) {
    shoppingapp = JSON.parse(shoppingapp);
    if (shoppingapp[props]) {
      delete shoppingapp[props];
    }
    return localStorage.setItem('shoppingapp', JSON.stringify(shoppingapp));
  }
};

const updateLocalStorage = (paymentMethods) => {
  let shoppingapp = localStorage.getItem('shoppingapp');
  if (shoppingapp) {
    shoppingapp = JSON.parse(shoppingapp);
    if (paymentMethods?.length > 0) {
      return localStorage.setItem(
        'shoppingapp',
        JSON.stringify({ ...shoppingapp, paymentMethods })
      );
    }
    delete shoppingapp.paymentMethods;
    return localStorage.setItem('shoppingapp', JSON.stringify(shoppingapp));
  }
  if (paymentMethods) {
    localStorage.setItem('shoppingapp', JSON.stringify({ paymentMethods }));
  }
};

export const getPaymentMethods =
  (userId, token) => async (dispatch, getState) => {
    try {
      dispatch({ type: req.PAYMENT_METHODS_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/payment/users/${userId}`,
        'GET',
        { Authorization: `Bearer ${token}` }
      );
      if (error) {
        return dispatch({ type: req.PAYMENT_METHODS_FAILURE, payload: error });
      }
      dispatch({ type: req.PAYMENT_METHODS_SUCCESS, payload: data });
      updateLocalStorage(getState().payment.paymentMethods);
    } catch (error) {
      console.log(error);
    }
  };

export const savePaymentMethod =
  (userId, token, paymentInfo, onSuccess) => async (dispatch, getState) => {
    try {
      dispatch({ type: req.SAVE_PAYMENT_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/payment/users/${userId}/new`,
        'POST',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(paymentInfo)
      );
      if (error) {
        return dispatch({ type: req.SAVE_PAYMENT_FAILURE, payload: error });
      }
      dispatch({ type: req.SAVE_PAYMENT_SUCCESS, payload: data });
      updateLocalStorage(getState().payment.paymentMethods);
      onSuccess('saved');
    } catch (error) {
      console.log(error);
    }
  };

export const removePaymentMethod =
  (userId, token, paymentId, onSuccess) => async (dispatch, getState) => {
    try {
      dispatch({ type: req.REMOVE_PAYMENT_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/payment/${paymentId}/users/${userId}`,
        'DELETE',
        { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      );
      if (error) {
        return dispatch({ type: req.REMOVE_PAYMENT_FAILURE, payload: error });
      }
      dispatch({ type: req.REMOVE_PAYMENT_SUCCESS, payload: data });
      updateLocalStorage(getState().payment.paymentMethods);
      onSuccess('removed');
    } catch (error) {
      console.log(error);
    }
  };

export const removeAllPaymentMethods = () => (dispatch, getState) => {
  dispatch({ type: req.REMOVE_ALL_PAYMENT });
  clearLocalStorage('paymentMethods');
};
