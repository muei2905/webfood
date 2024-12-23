
import {
    GET_RESTAURANTS_ORDER_REQUEST,
    GET_RESTAURANTS_ORDER_SUCCESS,
    GET_RESTAURANTS_ORDER_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE
  } from "./ActionType";
  import { Api } from "../../config/api";

export const getRestaurantsOrder = ({restaurantId, orderStatus, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
    try {
      const {data} = await Api.get(`/api/admin/order/restaurant/${restaurantId}`, {
        params:{order_status:orderStatus},
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const orders= data;
      dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, orders });
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const updateOrderStatus = ({orderId, orderStatus, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const response = await Api.put(`/api/admin/orders/${orderId}/${orderStatus}`, {}, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const updateOrder =response.data;
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, updateOrder });
    } catch (error) {
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
    }
  };
};