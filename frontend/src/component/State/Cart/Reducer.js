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
    REMOVE_CARTITEM_FAILURE,
} from "./ActionType";
import { LOGOUT } from "../Authentication/ActionType";
const initialState = {
    cartItems: [],
    cart: null,
    isLoading: false,
    error: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_CART_REQUEST:
        case CLEAR_CART_REQUEST:
        case GET_ALL_CART_ITEMS_REQUEST:
        case ADD_ITEM_TO_CART_REQUEST:
        case UPDATE_CARTITEM_REQUEST:
        case REMOVE_CARTITEM_REQUEST:
            return { ...state, isLoading: true, error: null };

            case FIND_CART_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    cart: action.payload,
                    cartItems: action.payload.item || [],
                };
            
        case CLEAR_CART_SUCCESS:
            return { ...state, isLoading: false, cartItems: [] };

        case GET_ALL_CART_ITEMS_SUCCESS:
            return { ...state, isLoading: false, cartItems: action.payload };

            case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [action.payload, ...state.cartItems],
            };

        case UPDATE_CARTITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        case REMOVE_CARTITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };

        case FIND_CART_FAILURE:
        case CLEAR_CART_FAILURE:
        case GET_ALL_CART_ITEMS_FAILURE:
        case ADD_ITEM_TO_CART_FAILURE:
        case UPDATE_CARTITEM_FAILURE:
        case REMOVE_CARTITEM_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case LOGOUT:
            localStorage.removeItem("jwt");
            return {
                ...state,
                cartItems: [],
                cart: null,
                success: "logout success",
            };

        default:
            return state;
    }
};
