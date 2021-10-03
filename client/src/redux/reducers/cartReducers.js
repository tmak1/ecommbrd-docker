import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART,
} from '../actions/cartActions';

const addToCart = (state, payload) => {
  let cartItems = [];
  let itemExists = false;
  if (state.cartItems.length > 0) {
    cartItems = state.cartItems.map((product) => {
      if (product.id === payload.id) {
        itemExists = true;
        return payload;
      }
      return product;
    });
  }
  if (!itemExists) {
    cartItems = [...state.cartItems, payload];
  }
  return cartItems;
};

const removeFromCart = (state, payload) => {
  let cartItems = state.cartItems.filter((product) => product.id !== payload);
  return cartItems;
};

const cartReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART_REQUEST:
      return { ...state, loading: true };
    case ADD_TO_CART_SUCCESS:
      return { loading: false, cartItems: addToCart(state, payload) };
    case ADD_TO_CART_FAILURE:
      return { ...state, loading: false, error: payload };
    case REMOVE_FROM_CART:
      return {
        ...state,
        loading: false,
        cartItems: removeFromCart(state, payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
