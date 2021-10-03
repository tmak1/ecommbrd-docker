import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_REQUEST,
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

export const orderDetailsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: payload };
    case ORDER_DETAILS_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const placeOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PLACE_ORDER_REQUEST:
      return { loading: true };
    case PLACE_ORDER_SUCCESS:
      return { loading: false, order: payload };
    case PLACE_ORDER_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const orderListReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: payload };
    case ORDER_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const orderListByUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_ORDER_LIST_REQUEST:
      return { loading: true };
    case USER_ORDER_LIST_SUCCESS:
      return { loading: false, orderInfo: payload };
    case USER_ORDER_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const orderListByProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_ORDER_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_ORDER_LIST_SUCCESS:
      return { loading: false, orderInfo: payload };
    case PRODUCT_ORDER_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const orderForProductByUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_ORDER_BY_USER_REQUEST:
      return { loading: true };
    case PRODUCT_ORDER_BY_USER_SUCCESS:
      return { loading: false, orderExists: payload };
    case PRODUCT_ORDER_BY_USER_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const orderUpdateIsDeliveredReducer = (
  state = {},
  { type, payload }
) => {
  switch (type) {
    case UPDATE_ORDER_ISDELIVERED_REQUEST:
      return { loading: true };
    case UPDATE_ORDER_ISDELIVERED_SUCCESS:
      return { loading: false, isDelivered: payload };
    case UPDATE_ORDER_ISDELIVERED_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
