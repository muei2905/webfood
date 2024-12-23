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
import { Api } from "../../config/api";

export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const {data} = await Api.post(`/api/order`, reqData.order, {
        headers: { Authorization: `Bearer ${reqData.jwt}` },
      });
      console.log("created order", data)
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data});
    } catch (error) {
      console.log("error", error)
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error});
    }
  };
};
export const createOrderWithPayment = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_WITH_PAYMENT_REQUEST });
    try {
      const {data} = await Api.post(`/api/order/payment`, reqData.order, {
        headers: { Authorization: `Bearer ${reqData.jwt}` },
      });
      if(data.payment_url){
        window.location.href=data.payment_url;
      }
      console.log("created order", data)
      dispatch({ type: CREATE_ORDER_WITH_PAYMENT_SUCCESS, payload: data});
    } catch (error) {
      console.log("error", error)
      dispatch({ type: CREATE_ORDER_WITH_PAYMENT_FAILURE, payload: error});
    }
  };
};
export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
      const {data} = await Api.get(`/api/order/user`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("user order", data)
      dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error)
      dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
    }
  };
};

