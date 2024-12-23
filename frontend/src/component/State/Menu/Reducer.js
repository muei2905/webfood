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
  

const initialState = {
    menuItems: [],
    isLoading: false,
    error: null,
  };
  
  export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_MENU_ITEM_REQUEST:
      case GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
      case DELETE_MENU_ITEM_REQUEST:
      case SEARCH_MENU_ITEM_REQUEST:
      case UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
        return { ...state, isLoading: true, error: null };
  
      case CREATE_MENU_ITEM_SUCCESS:
        return { ...state, isLoading: false, menuItems: [...state.menuItems, action.payload] };
  
      case GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
        return { ...state, isLoading: false, menuItems: action.payload };
  
      case DELETE_MENU_ITEM_SUCCESS:
        return {
          ...state,
          isLoading: false,
          menuItems: state.menuItems.filter((item) => item.id !== action.payload),
        };
  
      case SEARCH_MENU_ITEM_SUCCESS:
        return { ...state, isLoading: false, menuItems: action.payload };
  
      case UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          menuItems: state.menuItems.map((item) =>
            item.id === action.payload.id ? { ...item, availability: action.payload.availability } : item
          ),
        };
  
      case CREATE_MENU_ITEM_FAILURE:
      case GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
      case DELETE_MENU_ITEM_FAILURE:
      case SEARCH_MENU_ITEM_FAILURE:
      case UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  