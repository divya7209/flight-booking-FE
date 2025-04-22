import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  CLEAR_LOGIN_USER,
  UPDATE_USER,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
} from "../../constants/user";
import { IUser, IUserLogin } from "../../interfaces/user";

export const userLogin = (payload: IUserLogin) => ({
  type: USER_LOGIN,
  payload,
});

export const loginSuccess = (payload: IUser) => ({
  type: USER_LOGIN_SUCCESS,
  payload,
});

export const loginFailed = (payload: string) => ({
  type: USER_LOGIN_FAILED,
  payload,
});

export const clearLoginUser = () => ({
  type: CLEAR_LOGIN_USER,
});

export const updateUser = (payload: IUser) => ({
  type: UPDATE_USER,
  payload,
});

export const userUpdateSuccess = (payload: IUser) => ({
  type: USER_UPDATE_SUCCESS,
  payload,
});

export const userUpdateFailed = (payload: string) => ({
  type: USER_UPDATE_FAILED,
  payload,
});
