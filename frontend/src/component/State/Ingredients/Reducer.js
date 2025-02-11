import {
    GET_INGREDIENTS,
    UPDATE_STOCK,
    CREATE_INGREDIENT_SUCCESS,
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    GET_INGREDIENT_CATEGORY_SUCCESS
  } from "./ActionType";
const initialState = {
    ingredients: [],
    categories: [],
    isLoading: false,
    error: null,
  };
  
  export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS:
  return {
    ...state,
    ingredients: Array.isArray(action.payload) ? action.payload : [],
  };

  
        case GET_INGREDIENT_CATEGORY_SUCCESS:
          return {
            ...state,
            categories: Array.isArray(action.payload) ? action.payload : [],
          };
        
  
  
      case CREATE_INGREDIENT_SUCCESS:
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload],
        };
  
        case UPDATE_STOCK:
          if (!action.payload || !action.payload.id) {
            console.error("Invalid payload in UPDATE_STOCK:", action.payload);
            return state; 
          }
          return {
            ...state,
            ingredients: state.ingredients.map((item) =>
              item.id === action.payload.id ? action.payload : item
            ),
          };
        
  
      default:
        return state;
    }
  };