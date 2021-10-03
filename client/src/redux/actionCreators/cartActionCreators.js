import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART,
} from '../actions/cartActions';
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

const updateLocalStorage = (cartItems) => {
  let shoppingapp = localStorage.getItem('shoppingapp');
  if (shoppingapp) {
    shoppingapp = JSON.parse(shoppingapp);
    if (cartItems.length > 0) {
      localStorage.setItem(
        'shoppingapp',
        JSON.stringify({ ...shoppingapp, cartItems })
      );
      return;
    }
    delete shoppingapp.cartItems;
    return localStorage.setItem('shoppingapp', JSON.stringify(shoppingapp));
  }
  if (cartItems.length > 0) {
    localStorage.setItem('shoppingapp', JSON.stringify({ cartItems }));
  }
};

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });
    const { error, data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/products/${productId}`
    );
    if (error) {
      return dispatch({ type: ADD_TO_CART_FAILURE, payload: error });
    }
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: { ...data, qty },
    });
    updateLocalStorage(getState().cart.cartItems);
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
  updateLocalStorage(getState().cart.cartItems);
};

export const clearCart = () => (dispatch, getState) => {
  getState().cart.cartItems.forEach((item) => {
    dispatch({ type: REMOVE_FROM_CART, payload: item.id });
  });
  clearLocalStorage('cartItems');
};
