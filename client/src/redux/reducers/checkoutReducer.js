import {
  VALIDATE_SHIPPING_SUCCESS,
  VALIDATE_SHIPPING_FAILED,
  VALIDATE_PAYMENT_SUCCESS,
  VALIDATE_PAYMENT_FAILED,
  REMOVE_SELECTED_SHIPPING,
  REMOVE_SELECTED_PAYMENT,
} from '../actions/checkoutActions';

const checkoutReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case VALIDATE_SHIPPING_SUCCESS:
      return { ...state, selectedshipping: payload, shippingError: null };
    case VALIDATE_SHIPPING_FAILED:
      return { ...state, selectedshipping: null, shippingError: payload };
    case VALIDATE_PAYMENT_SUCCESS:
      return { ...state, selectedpayment: payload, paymentError: null };
    case VALIDATE_PAYMENT_FAILED:
      return { ...state, selectedpayment: null, paymentError: payload };
    case REMOVE_SELECTED_SHIPPING:
      return { selectedshipping: null };
    case REMOVE_SELECTED_PAYMENT:
      return { selectedpayment: null };
    default:
      return state;
  }
};

export default checkoutReducer;
