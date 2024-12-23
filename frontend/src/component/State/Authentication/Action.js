import { ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, LOGOUT, REGISTER_FAILURE, GET_USER_FAILURE, ADD_TO_FAVORITE_FAILURE } from "./ActionType"
import { Api } from "../../config/api"

export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
       const {data}= await Api.post(`/auth/signup`, reqData.userData)
       if(data.jwt)localStorage.setItem("jwt", data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS, payload:data.jwt})
        console.log("register success", data)
    } catch (error) {
        dispatch({type:REGISTER_FAILURE, payload:error})
        console.log("error", error)
    }
}
export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
       const {data}= await Api.post(`/auth/signin`, reqData.userData)
       if(data.jwt)localStorage.setItem("jwt", data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})
        console.log("login success", data)
    } catch (error) {
        dispatch({type:LOGIN_FAILURE, payload:error})
        console.log("error", error)
    }
}
export const getUser=(jwt)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try {
       const {data}= await Api.get(`/api/users/profile`, {
            headers:{
                Authorization:`Bearer ${jwt}`
            }
       })
       
        dispatch({type:GET_USER_SUCCESS, payload:data})
        console.log("user profile", data)
    } catch (error) {
        dispatch({type:GET_USER_FAILURE, payload:error})
        console.log("error", error)
    }
}
export const addToFavorite=({jwt, restaurantId})=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try {
       const {data}= await Api.put(`/api/restaurants/${restaurantId}/add-favorites`, {},{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
       })
       
        dispatch({type:ADD_TO_FAVORITE_SUCCESS, payload:data})
        console.log("added to favorite", data)
    } catch (error) {
        dispatch({type:ADD_TO_FAVORITE_FAILURE, payload:error})
        console.log("error", error)
    }
}
export const logoutUser = () => async (dispatch) => {
    try {
      localStorage.removeItem("jwt");
      dispatch({ type: LOGOUT });
      navigate("/account/login"); 
      console.log("Logout successful");
    } catch (error) {
      console.log("Error during logout", error);
    }
  };