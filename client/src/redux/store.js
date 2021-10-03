import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState, rootReducer } from './reducers/rootReducer';
import { logoutUser } from './actionCreators/userActionCreators';

let logoutTimer;

const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  let token;
  let shoppingapp = localStorage.getItem('shoppingapp')
    ? JSON.parse(localStorage.getItem('shoppingapp'))
    : null;

  if (shoppingapp) {
    token = shoppingapp.loggedInUser?.token;
    if (token) {
      if (jwt_decode(token).exp * 1000 >= Date.now()) {
        const timeLeft = jwt_decode(token).exp * 1000 - Date.now();

        logoutTimer = setTimeout(() => {
          localStorage.clear();
          store.dispatch(logoutUser());
        }, timeLeft);
      } else {
        localStorage.clear();
        store.dispatch(logoutUser());
      }
    } else {
      clearTimeout(logoutTimer);
    }
  }
  next(action);
};

const middlewares = [thunk, checkTokenExpirationMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
