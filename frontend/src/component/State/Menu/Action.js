import { Api } from "../../config/api";
import {
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    CREATE_MENU_ITEM_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE
  } from "./ActionType";
  
export const createMenuItem = ({menuData, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
      const {data} = await Api.post(`/api/admin/food`, menuData, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("created", data)
      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log(error)
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error});
    }
  };
};

export const getMenuItemsByRestaurantId = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });

    try {
      const { data } = await Api.get(`/api/food/restaurant/${restaurantId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
    }
  };
};


export const deleteMenuItem = ({foodID, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
      await Api.delete(`/api/admin/food/${foodID}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodID });
    } catch (error) {
      dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error});
    }
  }
};

export const searchMenuItem = ({keyword, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const {data} = await Api.get(`/api/food/search?name=${keyword}`, {
        params: { query },
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload:data });
    } catch (error) {
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

export const updateMenuAvailability = ({foodId, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const {data} = await Api.put(`/api/admin/food/${foodId}`, {}, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error});
    }
  };
};