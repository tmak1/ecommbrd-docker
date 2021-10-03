import * as req from '../actions/shippingActions';
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

const updateLocalStorage = (shippingAddresses) => {
  let shoppingapp = localStorage.getItem('shoppingapp');
  if (shoppingapp) {
    shoppingapp = JSON.parse(shoppingapp);
    if (shippingAddresses?.length > 0) {
      return localStorage.setItem(
        'shoppingapp',
        JSON.stringify({ ...shoppingapp, shippingAddresses })
      );
    }
    delete shoppingapp.shippingAddresses;
    return localStorage.setItem('shoppingapp', JSON.stringify(shoppingapp));
  }
  if (shippingAddresses) {
    localStorage.setItem('shoppingapp', JSON.stringify({ shippingAddresses }));
  }
};

export const getShippingAddresses =
  (userId, token) => async (dispatch, getState) => {
    try {
      dispatch({ type: req.SHIPPING_ADDRESSES_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/shipping/users/${userId}`,
        'GET',
        { Authorization: `Bearer ${token}` }
      );
      if (error) {
        return dispatch({
          type: req.SHIPPING_ADDRESSES_FAILURE,
          payload: error,
        });
      }
      dispatch({ type: req.SHIPPING_ADDRESSES_SUCCESS, payload: data });
      updateLocalStorage(getState().shipping.shippingAddresses);
    } catch (error) {
      console.log(error);
    }
  };

export const saveShippingAddress =
  (userId, token, shippingInfo, onSuccess) => async (dispatch, getState) => {
    try {
      dispatch({ type: req.SAVE_SHIPPING_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/shipping/users/${userId}/new`,
        'POST',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(shippingInfo)
      );
      if (error) {
        return dispatch({ type: req.SAVE_SHIPPING_FAILURE, payload: error });
      }
      dispatch({ type: req.SAVE_SHIPPING_SUCCESS, payload: data });
      updateLocalStorage(getState().shipping.shippingAddresses);
      onSuccess('saved');
    } catch (error) {
      console.log(error);
    }
  };

export const updateShippingAddress =
  (userId, token, shippingId, shippingInfo, onSuccess) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: req.EDIT_SHIPPING_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/shipping/${shippingId}/users/${userId}`,
        'PATCH',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(shippingInfo)
      );
      if (error) {
        return dispatch({ type: req.EDIT_SHIPPING_FAILURE, payload: error });
      }
      dispatch({ type: req.EDIT_SHIPPING_SUCCESS, payload: data });
      updateLocalStorage(getState().shipping.shippingAddresses);
      onSuccess('updated');
    } catch (error) {
      console.log(error);
    }
  };

export const removeShippingAddress =
  (userId, token, shippingId, onSuccess) => async (dispatch, getState) => {
    try {
      dispatch({ type: req.REMOVE_SHIPPING_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/shipping/${shippingId}/users/${userId}`,
        'DELETE',
        { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      );
      if (error) {
        return dispatch({ type: req.REMOVE_SHIPPING_FAILURE, payload: error });
      }
      dispatch({ type: req.REMOVE_SHIPPING_SUCCESS, payload: data });
      updateLocalStorage(getState().shipping.shippingAddresses);
      onSuccess('removed');
    } catch (error) {
      console.log(error);
    }
  };

export const removeAllShippingAddresses = () => (dispatch, getState) => {
  dispatch({ type: req.REMOVE_ALL_SHIPPING });
  clearLocalStorage('shippingAddresses');
};
