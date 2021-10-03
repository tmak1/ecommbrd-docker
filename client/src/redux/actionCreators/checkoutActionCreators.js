import {
  VALIDATE_SHIPPING_FAILED,
  VALIDATE_SHIPPING_SUCCESS,
  VALIDATE_PAYMENT_FAILED,
  VALIDATE_PAYMENT_SUCCESS,
  REMOVE_SELECTED_SHIPPING,
  REMOVE_SELECTED_PAYMENT,
} from '../actions/checkoutActions';

const updateLocalStorage = (item, itemType) => {
  let shoppingapp = localStorage.getItem('shoppingapp');
  if (shoppingapp) {
    shoppingapp = JSON.parse(shoppingapp);
    if (item) {
      return localStorage.setItem(
        'shoppingapp',
        JSON.stringify({
          ...shoppingapp,
          [itemType]: item,
        })
      );
    }
    delete shoppingapp[itemType];
    return localStorage.setItem('shoppingapp', JSON.stringify(shoppingapp));
  }
  if (item) {
    localStorage.setItem('shoppingapp', JSON.stringify({ [itemType]: item }));
  }
};

const validateForm = (item, ignoreFields) => {
  let errorText;
  const formError = Object.entries(item).some(([key, val]) => {
    if (ignoreFields.indexOf(key) === -1) {
      return val.toString().trim() === '';
    }
    return null;
  });
  if (formError) {
    errorText = 'One or more fields missing';
    return errorText;
  }
};

export const validateShipping =
  (shipping, ignoreFields = []) =>
  (dispatch, getState) => {
    const errorText = validateForm(shipping, ignoreFields);
    if (errorText) {
      return dispatch({
        type: VALIDATE_SHIPPING_FAILED,
        payload: errorText,
      });
    }
    dispatch({ type: VALIDATE_SHIPPING_SUCCESS, payload: shipping });
    updateLocalStorage(
      getState().checkout.selectedshipping,
      'selectedshipping'
    );
  };

export const validatePayment =
  (payment, ignoreFields = []) =>
  (dispatch, getState) => {
    const errorText = validateForm(payment, ignoreFields);
    if (errorText) {
      return dispatch({
        type: VALIDATE_PAYMENT_FAILED,
        payload: errorText,
      });
    }
    dispatch({ type: VALIDATE_PAYMENT_SUCCESS, payload: payment });
    updateLocalStorage(getState().checkout.selectedpayment, 'selectedpayment');
  };

export const removeSelectedShipping = () => (dispatch, getState) => {
  dispatch({ type: REMOVE_SELECTED_SHIPPING });
  updateLocalStorage(getState().checkout.selectedshipping, 'selectedshipping');
};

export const removeSelectedPayment = () => (dispatch, getState) => {
  dispatch({ type: REMOVE_SELECTED_PAYMENT });
  updateLocalStorage(getState().checkout.selectedpayment, 'selectedpayment');
};
