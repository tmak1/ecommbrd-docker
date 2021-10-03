import * as req from '../actions/shippingActions';

const shippingReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case req.SHIPPING_ADDRESSES_REQUEST:
      return { loading: true };
    case req.SHIPPING_ADDRESSES_SUCCESS:
      return { loading: false, shippingAddresses: payload };
    case req.SHIPPING_ADDRESSES_FAILURE:
      return { loading: false, error: payload };

    case req.SAVE_SHIPPING_REQUEST:
      return { ...state, loading: true };
    case req.SAVE_SHIPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingAddresses: [...state.shippingAddresses, payload],
      };
    case req.SAVE_SHIPPING_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case req.EDIT_SHIPPING_REQUEST:
      return { ...state, loading: true };
    case req.EDIT_SHIPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingAddresses: [
          ...state.shippingAddresses.filter(
            (address) => address.id !== payload.id
          ),
          payload,
        ],
      };
    case req.EDIT_SHIPPING_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case req.REMOVE_SHIPPING_REQUEST:
      return { ...state, loading: true };
    case req.REMOVE_SHIPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingAddresses: state.shippingAddresses.filter(
          (address) => address.id !== payload.id
        ),
      };
    case req.REMOVE_SHIPPING_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    case req.REMOVE_ALL_SHIPPING:
      return { shippingAddresses: [] };
    default:
      return state;
  }
};

export default shippingReducer;
