import {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_CHANGED_NAME,
  REMOVE_UPDATED_USER,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_BYADMIN_REQUEST,
  USER_UPDATE_BYADMIN_SUCCESS,
  USER_UPDATE_BYADMIN_FAILURE,
} from '../actions/userActions';
import { sendRequest } from '../../helpers';
import { removeAllShippingAddresses } from './shippingActionCreators';
import { removeAllPaymentMethods } from './paymentActionCreators';
import {
  removeSelectedShipping,
  removeSelectedPayment,
} from './checkoutActionCreators';

import { clearCart } from './cartActionCreators';

const updateLocalStorage = (user, userType) => {
  let shoppingapp = localStorage.getItem('shoppingapp');
  if (shoppingapp) {
    shoppingapp = JSON.parse(shoppingapp);
    if (user) {
      return localStorage.setItem(
        'shoppingapp',
        JSON.stringify({ ...shoppingapp, [userType]: user })
      );
    }
    delete shoppingapp[userType];
    return localStorage.setItem('shoppingapp', JSON.stringify(shoppingapp));
  }
  if (user) {
    localStorage.setItem('shoppingapp', JSON.stringify({ [userType]: user }));
  }
};

export const authenticateUser =
  (loginInfo, operation) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_AUTH_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users/${operation}`,
        'POST',
        { 'Content-Type': 'application/json' },
        JSON.stringify(loginInfo)
      );
      if (error) {
        return dispatch({ type: USER_AUTH_FAILURE, payload: error });
      }
      dispatch({ type: USER_AUTH_SUCCESS, payload: data });
      updateLocalStorage(getState().userAuth.loggedInUser, 'loggedInUser');
    } catch (error) {
      console.log(error);
    }
  };

export const logoutUser = () => (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: REMOVE_UPDATED_USER });
    updateLocalStorage(getState().userAuth.loggedInUser, 'loggedInUser');
    updateLocalStorage(getState().userUpdate.updatedUser, 'updatedUser');

    dispatch(removeAllShippingAddresses());
    dispatch(removeAllPaymentMethods());
    dispatch(removeSelectedShipping());
    dispatch(removeSelectedPayment());
    dispatch(clearCart());
  } catch (error) {
    console.log(error);
  }
};

export const updateUser =
  (userId, token, updateInfo, onSuccess = () => {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        'PATCH',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(updateInfo)
      );
      if (error) {
        return dispatch({ type: USER_UPDATE_FAILURE, payload: error });
      }
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      //updateLocalStorage(getState().userUpdate.updatedUser, 'updatedUser');
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

export const userChangedName = (name) => (dispatch, getState) => {
  dispatch({ type: USER_CHANGED_NAME, payload: name });
  updateLocalStorage(getState().userAuth.loggedInUser, 'loggedInUser');
};

export const listUsers =
  (token, searchTerm = '', page = '', perPage = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users?userId=${searchTerm}&page=${page}&perPage=${perPage}`,
        'GET',
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (error) {
        return dispatch({ type: USER_LIST_FAILURE, payload: error });
      }
      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteUser =
  (userId, token, onSuccess) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DELETE_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        'DELETE',
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (error) {
        return dispatch({ type: USER_DELETE_FAILURE, payload: error });
      }
      dispatch({ type: USER_DELETE_SUCCESS, payload: data });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

export const updateUserByAdmin =
  (userId, token, updateInfo, onSuccess = () => {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_BYADMIN_REQUEST });
      const { error, data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        'PATCH',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(updateInfo)
      );
      if (error) {
        return dispatch({ type: USER_UPDATE_BYADMIN_FAILURE, payload: error });
      }
      dispatch({ type: USER_UPDATE_BYADMIN_SUCCESS, payload: data });
      //updateLocalStorage(getState().userUpdate.updatedUser, 'updatedUser');
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
