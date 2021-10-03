import * as req from '../actions/paymentActions';

const paymentReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case req.PAYMENT_METHODS_REQUEST:
      return { loading: true };
    case req.PAYMENT_METHODS_SUCCESS:
      return { loading: false, paymentMethods: payload };
    case req.PAYMENT_METHODS_FAILURE:
      return { loading: false, error: payload };

    case req.SAVE_PAYMENT_REQUEST:
      return { ...state, loading: true };
    case req.SAVE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentMethods: [...state.paymentMethods, payload],
      };
    case req.SAVE_PAYMENT_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case req.REMOVE_PAYMENT_REQUEST:
      return { ...state, loading: true };
    case req.REMOVE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentMethods: state.paymentMethods.filter(
          (payment) => payment.id !== payload.id
        ),
      };
    case req.REMOVE_PAYMENT_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    case req.REMOVE_ALL_PAYMENT:
      return { paymentMethods: [] };
    default:
      return state;
  }
};

export default paymentReducer;
