import {
    GET_RESTAURANTS_ORDER_REQUEST,
    GET_RESTAURANTS_ORDER_SUCCESS,
    GET_RESTAURANTS_ORDER_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE
  } from "./ActionType";
  const initialState = {
    restaurantOrders: [],
    isLoading: false,
    error: null,
  };
  
  export const restaurantOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_RESTAURANTS_ORDER_REQUEST:
      case UPDATE_ORDER_STATUS_REQUEST:
        return { ...state, isLoading: true, error: null };
  
      case GET_RESTAURANTS_ORDER_SUCCESS:
        return { ...state, isLoading: false, restaurantOrders: action.payload };
  
      case UPDATE_ORDER_STATUS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          restaurantOrders: state.restaurantOrders.map((order) =>
            order.id === action.payload.id ? { ...order, ...action.payload } : order
          ),
        };
  
      case GET_RESTAURANTS_ORDER_FAILURE:
      case UPDATE_ORDER_STATUS_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  