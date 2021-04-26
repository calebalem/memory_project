import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const {data} = await api.signIn(formData);
    localStorage.setItem('profile', JSON.stringify(data));
    dispatch({type: AUTH, data});
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};
export const signUp = (formData, history) => async (dispatch) => {
  try {
    const {data} = await api.signUp(formData);
    localStorage.setItem('profile', JSON.stringify(data));
    dispatch({type: AUTH, data});
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};
