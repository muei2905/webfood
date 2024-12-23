import {
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    FIND_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE,
    UPDATE_CARTITEM_REQUEST,
    UPDATE_CARTITEM_SUCCESS,
    UPDATE_CARTITEM_FAILURE,
    REMOVE_CARTITEM_REQUEST,
    REMOVE_CARTITEM_SUCCESS,
    REMOVE_CARTITEM_FAILURE
} from "./ActionType";
import { Api } from "../../config/api";

export const findCart = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });
    try {
      const response = await Api.get(`/api/cart`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("cartttt:", response.data)
      dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FIND_CART_FAILURE, payload: error.message });
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST });
    try {
      await Api.delete(`/api/cart/clear`,{},{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      dispatch({ type: CLEAR_CART_SUCCESS });
    } catch (error) {
      dispatch({ type: CLEAR_CART_FAILURE, payload: error });
    }
  };
};

export const getAllCartItems = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
    try {
      const response = await Api.get(`/api/cart/${reqData.cartId}/items`, {
        headers: { Authorization: `Bearer ${reqData.jwt}` },
      });
      dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
    }
  };
};

export const addItemToCart = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
      const {data} = await Api.put(`/api/cart/add`, reqData.cartItem, {
        headers: { Authorization: `Bearer ${reqData.jwt}` },
      });
      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload:data });
    } catch (error) {
      dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
    }
  };
};

export const updateCartItem = ({ reqData, jwt }) => {
  console.log("Request Data to API:", reqData);
  return async (dispatch) => {
      dispatch({ type: UPDATE_CARTITEM_REQUEST });
      try {
          const { data } = await Api.put(`/api/cart-item/update`, reqData, {
              headers: { Authorization: `Bearer ${jwt}` },
          });
          console.log("API Response Data:", data); 
          dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
      } catch (error) {
          console.error("API Error:", error);
          dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error });
      }
  };
};


export const removeCartItem = ({cartItemId, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });
    try {
      await Api.delete(`/api/cart-item/${cartItemId}/remove`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
    } catch (error) {
      dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error });
    }
  };
};