import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  TOP_PRODUCT_LIST_REQUEST,
  TOP_PRODUCT_LIST_SUCCESS,
  TOP_PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_LIST_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_UPDATE_BYADMIN_REQUEST,
  PRODUCT_UPDATE_BYADMIN_SUCCESS,
  PRODUCT_UPDATE_BYADMIN_FAILURE,
} from '../actions/productActions';

export const productListReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, productInfo: payload };
    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productTopListReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case TOP_PRODUCT_LIST_REQUEST:
      return { loading: true };
    case TOP_PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case TOP_PRODUCT_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAILS_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const adminProductListReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADMIN_PRODUCT_LIST_REQUEST:
      return { loading: true };
    case ADMIN_PRODUCT_LIST_SUCCESS:
      return { loading: false, productInfo: payload };
    case ADMIN_PRODUCT_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = null, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_CREATE_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = null, { type, payload }) => {
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DELETE_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productUpdateByAdminReducer = (
  state = null,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_UPDATE_BYADMIN_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_BYADMIN_SUCCESS:
      return { loading: false, updatedProduct: payload };
    case PRODUCT_UPDATE_BYADMIN_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
