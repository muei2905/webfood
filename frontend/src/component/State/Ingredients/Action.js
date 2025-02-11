import {
    GET_INGREDIENTS,
    UPDATE_STOCK,
    CREATE_INGREDIENT_REQUEST,
    CREATE_INGREDIENT_SUCCESS,
    CREATE_INGREDIENT_FAILURE,
    CREATE_INGREDIENT_CATEGORY_REQUEST,
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    CREATE_INGREDIENT_CATEGORY_FAILURE,
    GET_INGREDIENT_CATEGORY_REQUEST,
    GET_INGREDIENT_CATEGORY_SUCCESS,
    GET_INGREDIENT_CATEGORY_FAILURE
  } from "./ActionType";
  import { Api } from "../../config/api";

export const getIngredientsOfRestaurant = ({id, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: GET_INGREDIENTS });
    try {
      const response = await Api.get(`/api/admin/ingredients/restaurant/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log(response.data);
      dispatch({ type: GET_INGREDIENTS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_INGREDIENTS, payload: error });
    }
  };
};

export const updateStockOfIngredient = ({ingredientId, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_STOCK });
    try {
      const response = await Api.put(`/api/admin/ingredients/${ingredientId}/stoke`, {}, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("success");
      dispatch({ type: UPDATE_STOCK, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_STOCK, payload: error.message });
    }
  };
};

export const createIngedient = ({ingredientData, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
      const response = await Api.post(`/api/admin/ingredients`, ingredientData, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("create ingredient",response.data)
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("errrorrrrrr",error)
      dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error.message });
    }
  };
};

export const createIngredientCategory = ({categoryData, jwt}) => {
  console.log("data to" ,categoryData)
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
      const response = await Api.post(`/api/admin/ingredients/category`, categoryData, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("create success" ,response.data)
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("create fail" ,response.data)

      dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getIngredientCategories = ({id, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
    try {
      const response = await Api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("ingredient category", response.data)
      dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error.message });
    }
  };
};