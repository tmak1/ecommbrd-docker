import {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_CHANGED_NAME,
  REMOVE_UPDATED_USER,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
} from '../actions/userActions';

export const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_AUTH_REQUEST:
      return { loading: true };
    case USER_AUTH_SUCCESS:
      return { loading: false, loggedInUser: payload };
    case USER_AUTH_FAILURE:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      return { loggedInUser: null };
    case USER_CHANGED_NAME:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          user: { ...state.loggedInUser?.user, name: payload },
        },
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = null, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, updatedUser: payload };
    case USER_UPDATE_FAILURE:
      return { loading: false, error: payload };
    case REMOVE_UPDATED_USER:
      return { updatedUser: null };
    default:
      return state;
  }
};

export const userListReducer = (state = null, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = null, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, user: payload };
    case USER_DELETE_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userUpdateByAdminReducer = (state = null, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, updatedUser: payload };
    case USER_UPDATE_FAILURE:
      return { loading: false, error: payload };
    case REMOVE_UPDATED_USER:
      return { updatedUser: null };
    default:
      return state;
  }
};
