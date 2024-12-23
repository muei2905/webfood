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
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  SEARCH_RESTAURANTS_REQUEST,
  SEARCH_RESTAURANTS_SUCCESS,
  SEARCH_RESTAURANTS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
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

const initialState = {
  restaurants: [],
  usersRestaurant: null,
  restaurant: null,
  loading: false,
  error: null,
  events: [],
  restaurantsEvents: [],
  categories: [],
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
    case DELETE_RESTAURANT_REQUEST:
    case GET_ALL_RESTAURANTS_REQUEST:
    case GET_RESTAURANT_BY_ID_REQUEST:
    case GET_RESTAURANT_BY_USER_ID_REQUEST:
    case SEARCH_RESTAURANTS_REQUEST:
    case UPDATE_RESTAURANT_STATUS_REQUEST:
    case CREATE_EVENT_REQUEST:
    case GET_ALL_EVENTS_REQUEST:
    case DELETE_EVENT_REQUEST:
    case GET_RESTAURANTS_EVENTS_REQUEST:
    case CREATE_CATEGORY_REQUEST:
    case GET_RESTAURANTS_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_RESTAURANT_SUCCESS:
      return { ...state, loading: false, restaurants: [...state.restaurants, action.payload] };

    case UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        ),
      };

    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.filter((restaurant) => restaurant.id !== action.payload),
      };

    case GET_ALL_RESTAURANTS_SUCCESS:
      return { ...state, loading: false, restaurants: action.payload };

    case GET_RESTAURANT_BY_ID_SUCCESS:
      return { ...state, loading: false, restaurant: action.payload };

    case GET_RESTAURANT_BY_USER_ID_SUCCESS:
      return { ...state, loading: false, usersRestaurant: action.payload };

    case SEARCH_RESTAURANTS_SUCCESS:
      return { ...state, loading: false, restaurants: action.payload };

    case UPDATE_RESTAURANT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === action.payload.id ? { ...restaurant, status: action.payload.status } : restaurant
        ),
      };

    case CREATE_EVENT_SUCCESS:
      return { ...state, loading: false, events: [...state.events, action.payload] };

    case GET_ALL_EVENTS_SUCCESS:
      return { ...state, loading: false, events: action.payload };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((event) => event.id !== action.payload),
      };

    case GET_RESTAURANTS_EVENTS_SUCCESS:
      return { ...state, loading: false, restaurantsEvents: action.payload };

    case CREATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: [...state.categories, action.payload] };

    case GET_RESTAURANTS_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case CREATE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_FAILURE:
    case DELETE_RESTAURANT_FAILURE:
    case GET_ALL_RESTAURANTS_FAILURE:
    case GET_RESTAURANT_BY_ID_FAILURE:
    case GET_RESTAURANT_BY_USER_ID_FAILURE:
    case SEARCH_RESTAURANTS_FAILURE:
    case UPDATE_RESTAURANT_STATUS_FAILURE:
    case CREATE_EVENT_FAILURE:
    case GET_ALL_EVENTS_FAILURE:
    case DELETE_EVENT_FAILURE:
    case GET_RESTAURANTS_EVENTS_FAILURE:
    case CREATE_CATEGORY_FAILURE:
    case GET_RESTAURANTS_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
