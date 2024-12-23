import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_USERS_ORDERS_REQUEST,
    GET_USERS_ORDERS_SUCCESS,
    GET_USERS_ORDERS_FAILURE,
    CREATE_ORDER_WITH_PAYMENT_REQUEST,
    CREATE_ORDER_WITH_PAYMENT_SUCCESS,
    CREATE_ORDER_WITH_PAYMENT_FAILURE,
    GET_USERS_NOTIFICATION_REQUEST,
    GET_USERS_NOTIFICATION_SUCCESS,
    GET_USERS_NOTIFICATION_FAILURE
  } from "./ActionType";
  const initialState = {
    orders: [],
    notifications: [],
    isLoading: false,
    error: null,
    paymentLink: null,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS_ORDERS_REQUEST:
        return { ...state, isLoading: true, error: null };
  
      case GET_USERS_ORDERS_SUCCESS:
        return { ...state, isLoading: false, error: null, orders: action.payload };
  
      case GET_USERS_ORDERS_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
  
      case CREATE_ORDER_WITH_PAYMENT_REQUEST:
        return { ...state, isLoading: true, error: null };
  
      case CREATE_ORDER_WITH_PAYMENT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: null,
          orders: [...state.orders, action.payload.order], 
          paymentLink: action.payload.paymentLink,
        };
  
      case CREATE_ORDER_WITH_PAYMENT_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  