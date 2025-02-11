import {
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    SEARCH_RESTAURANTS_REQUEST,
    SEARCH_RESTAURANTS_SUCCESS,
    SEARCH_RESTAURANTS_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    ADD_TO_FAVORITE_REQUEST,
    ADD_TO_FAVORITE_SUCCESS,
    ADD_TO_FAVORITE_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAILURE,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS,
    GET_ALL_EVENTS_FAILURE,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAILURE,
    GET_RESTAURANTS_EVENTS_REQUEST,
    GET_RESTAURANTS_EVENTS_SUCCESS,
    GET_RESTAURANTS_EVENTS_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    GET_RESTAURANTS_CATEGORY_REQUEST,
    GET_RESTAURANTS_CATEGORY_SUCCESS,
    GET_RESTAURANTS_CATEGORY_FAILURE
  } from "./ActionType";
  
  import { Api } from "../../config/api";
  
  // Restaurant Actions
  export const createRestaurant = (reqData) => {
    console.log("token:", reqData.jwt);
    return async (dispatch) => {
      dispatch({ type: CREATE_RESTAURANT_REQUEST });
      try {
        const response = await Api.post(`/api/admin/restaurants`, reqData.data, {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        });
        dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: response.data });
        console.log("Restaurant created successfully", response.data);
      } catch (error) {
        dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error.message });
        console.log("Error creating restaurant", error);
      }
    };
  };
  
  export const updateRestaurant = (restaurantId, restaurantData, jwt) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_RESTAURANT_REQUEST });
      try {
        const response = await Api.put(`/api/admin/restaurants/${restaurantId}`, restaurantData, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: response.data });
        console.log("Restaurant updated successfully", response.data);
      } catch (error) {
        dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
        console.log("Error updating restaurant", error);
      }
    };
  };
  
  export const deleteRestaurant = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_RESTAURANT_REQUEST });
      try {
        await Api.delete(`/api/admin/restaurants/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
        console.log("Restaurant deleted successfully");
      } catch (error) {
        dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
        console.log("Error deleting restaurant", error);
      }
    };
  };
  
  export const getAllRestaurants = (jwt) => {
    return async (dispatch) => {
      dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
      try {
        const response = await Api.get(`/api/restaurants`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: response.data });
        console.log("Fetched all restaurants", response.data);
      } catch (error) {
        dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
        console.log("Error fetching restaurants", error);
      }
    };
  };
  
  export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
      dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
      try {
        const response = await Api.get(`/api/restaurants/${reqData.restaurantId}`, {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        });
        dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
        console.log("Fetched restaurant by ID", response.data);
      } catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
        console.log("Error fetching restaurant by ID", error);
      }
    };
  };
  
  export const searchRestaurants = (query) => {
    return async (dispatch) => {
      dispatch({ type: SEARCH_RESTAURANTS_REQUEST });
      try {
        const response = await Api.get(`/restaurants/search`, { params: { query } });
        dispatch({ type: SEARCH_RESTAURANTS_SUCCESS, payload: response.data });
        console.log("Searched restaurants", response.data);
      } catch (error) {
        dispatch({ type: SEARCH_RESTAURANTS_FAILURE, payload: error.message });
        console.log("Error searching restaurants", error);
      }
    };
  };
  
  export const updateRestaurantStatus = ({restaurantId, jwt}) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
      try {
        const response = await Api.put(`/api/admin/restaurants/${restaurantId}/status`, {}, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: response.data });
        console.log("Updated restaurant status", response.data);
      } catch (error) {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
        console.log("Error updating restaurant status", error);
      }
    };
  };
  
  export const addToFavorite = (jwt, restaurantId) => {
    return async (dispatch) => {
      dispatch({ type: ADD_TO_FAVORITE_REQUEST });
      try {
        const response = await Api.put(`/restaurants/${restaurantId}/add-favorite`, {}, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: response.data });
        console.log("Added to favorite", response.data);
      } catch (error) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error.message });
        console.log("Error adding to favorite", error);
      }
    };
  };
  
  export const getRestaurantsByUserId = (jwt) => {
    return async (dispatch) => {
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
      try {
        const response = await Api.get(`/api/admin/restaurants/user`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: response.data });
        console.log("Fetched restaurants by user ID", response.data);
      } catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error.message });
        console.log("Error fetching restaurants by user ID", error);
      }
    };
  };
  
  export const createEvent = ({ data, jwt, restaurantId }) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_EVENT_REQUEST });
      try {
        const response = await Api.post(`/api/admin/events/restaurant/${restaurantId}`, data, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({ type: CREATE_EVENT_SUCCESS, payload: response.data });
        console.log("Event created successfully", response.data);
      } catch (error) {
        dispatch({ type: CREATE_EVENT_FAILURE, payload: error });
        console.log("Error creating event", error);
      }
    };
  };
  
  export const getAllEvents = ({ jwt }) => {
    return async (dispatch) => {
      dispatch({ type: GET_ALL_EVENTS_REQUEST });
      try {
        const response = await Api.get(`/api/events`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
        dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: response.data });
        console.log("Fetched all events", response.data);
      } catch (error) {
        dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error});
        console.log("Error fetching events", error);
      }
    };
  };
  
  export const deleteEvent = ({eventId, jwt}) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_EVENT_REQUEST });
      try {
        await Api.delete(`/api/admin/events/${eventId}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
        console.log("Event deleted successfully");
      } catch (error) {
        dispatch({ type: DELETE_EVENT_FAILURE, payload: error});
        console.log("Error deleting event", error);
      }
    };
  };
  
  export const getRestaurantsEvents = ({restaurantId, jwt}) => {
    return async (dispatch) => {
      dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
      try {
        const response = await Api.get(`/api/admin/events/restaurant/${restaurantId}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: response.data });
        console.log("Fetched all restaurant events", response.data);
      } catch (error) {
        dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
        console.log("Error fetching restaurant events", error);
      }
    };
  };
  
  export const createCategory = ({reqData, jwt}) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_CATEGORY_REQUEST });
      try {
        const response = await Api.post(`/api/admin/category`, reqData, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });
        console.log("Category created successfully", response.data);
      } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error});
        console.log("Error creating category", error);
      }
    };
  };
  
  export const getRestaurantsCategory = ({restaurantId, jwt}) => {
    return async (dispatch) => {
      dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
      try {
        const response = await Api.get(`/api/category/restaurant/${restaurantId}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: response.data });
        console.log("Fetched restaurant categories", response.data);
      } catch (error) {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
        console.log("Error fetching restaurant categories", error);
      }
    };
  };