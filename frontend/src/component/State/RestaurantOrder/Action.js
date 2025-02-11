
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
      
      dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload:data});
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const updateOrderStatus = ({orderId, orderStatus, jwt}) => {
 
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const {data} = await Api.put(`/api/admin/order/${orderId}/${orderStatus}`, {}, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
    
    
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload:data});
    } catch (error) {
      console.log(error)
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
    }
  };
};