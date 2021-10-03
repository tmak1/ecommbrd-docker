import { combineReducers } from 'redux';

import {
  productListReducer,
  productTopListReducer,
  productDetailsReducer,
  adminProductListReducer,
  productCreateReducer,
  productDeleteReducer,
  productUpdateByAdminReducer,
} from './productReducers';
import cartReducer from './cartReducers';
import {
  authReducer,
  userListReducer,
  userUpdateReducer,
  userDeleteReducer,
  userUpdateByAdminReducer,
} from './userReducers';
import {
  placeOrderReducer,
  orderDetailsReducer,
  orderListReducer,
  orderListByUserReducer,
  orderListByProductReducer,
  orderForProductByUserReducer,
  orderUpdateIsDeliveredReducer,
} from './orderReducers';
import {
  getAllProductReviewsReducer,
  getAllUserReviewsReducer,
  createReviewReducer,
  deleteReviewReducer,
} from './reviewReducers';
import shippingReducer from './shippingReducer';
import paymentReducer from './paymentReducer';
import checkoutReducer from './checkoutReducer';

const getItemsFromStorage = (propertyType, itemType) => {
  let items = propertyType === 'array' ? [] : null;
  let shoppingapp = localStorage.getItem('shoppingapp');
  if (shoppingapp) {
    shoppingapp = JSON.parse(shoppingapp);
    items = shoppingapp[itemType] || items;
  }
  return items;
};

// redux actually calls an indiividual reducer before the initialState in the store()
// function is applied. So state in a reducer needs to have a default value
// to fallback on while initialState (here below) is being applied to the reducer from store()

export const initialState = {
  cart: { cartItems: getItemsFromStorage('array', 'cartItems') },
  userAuth: {
    loggedInUser: getItemsFromStorage('object', 'loggedInUser'),
  },
  shipping: {
    shippingAddresses: getItemsFromStorage('array', 'shippingAddresses'),
  },
  payment: {
    paymentMethods: getItemsFromStorage('array', 'paymentMethods'),
  },
  checkout: {
    selectedshipping: getItemsFromStorage('object', 'selectedshipping'),
    selectedpayment: getItemsFromStorage('object', 'selectedpayment'),
  },
};

export const rootReducer = combineReducers({
  productsList: productListReducer,
  productsListTop: productTopListReducer,
  productDetails: productDetailsReducer,
  adminProductList: adminProductListReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdateByAdmin: productUpdateByAdminReducer,
  cart: cartReducer,
  userAuth: authReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDeleted: userDeleteReducer,
  userUpdateByAdmin: userUpdateByAdminReducer,
  shipping: shippingReducer,
  payment: paymentReducer,
  checkout: checkoutReducer,
  orderCreated: placeOrderReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  orderListByUser: orderListByUserReducer,
  orderListByProduct: orderListByProductReducer,
  orderForProductByUser: orderForProductByUserReducer,
  orderUpdateIsDelivered: orderUpdateIsDeliveredReducer,
  productReviews: getAllProductReviewsReducer,
  userReviews: getAllUserReviewsReducer,
  createReview: createReviewReducer,
  deleteReview: deleteReviewReducer,
});
