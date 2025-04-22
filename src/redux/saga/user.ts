import { call, put, takeEvery } from "@redux-saga/core/effects";

import { UPDATE_USER, USER_LOGIN } from "../../constants/user";
import { IUser, IUserLogin } from "../../interfaces/user";
import {
  loginFailed,
  loginSuccess,
  userUpdateFailed,
  userUpdateSuccess,
} from "../actions/userLogin";
import { IAction } from "../../interfaces/action";
import { toast } from "react-toastify";
import { apiUrl } from "../../utils/api";

export async function fetchUser({
  values,
  method,
  path,
}: {
  values: IUser | IUserLogin;
  method: string;
  path: string;
}) {
  try {
    const resp = await fetch(`${apiUrl}/${path}`, {
      method,
      body: values
        ? JSON.stringify({
          ...values,
          _id: undefined,
        })
        : null,
      headers: { "Content-Type": "application/json" },
    });
    if (resp?.ok) {
      const result = await resp.json();
      console.log('result', result)
      return result;
    }
    if (path.endsWith("/regester") && resp?.status === 409) {
      toast.error("You are already registered");
      throw `You are already registered`;
    } else throw `Error occured with status: ${resp?.status}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    } else {
      throw new Error(error as string);
    }
  }
}

export function* userLogin(action: IAction<IUserLogin>) {
  const values = action.payload;

  try {
    const response: IUser = yield call(fetchUser, {
      values,
      method: "POST",
      path: "users/login",
    });
    console.log("response", response);
    localStorage.setItem('userToken', JSON.stringify(response));
    if (response) yield put(loginSuccess(response));
    else {
      toast.error("No user found");
      throw new Error("No user found");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error?.message);
      yield put(loginFailed(error?.message as string));
    } else {
      toast.error(error as string);
      yield put(loginFailed(error as string));
    }
  }
}

export function* updateUser(action: IAction<IUser>) {
  const values = action.payload;
  const path = `users/${values?._id}`;

  try {
    const response: IUser = yield call(fetchUser, {
      values,
      method: "PATCH",
      path,
    });
    if (response) yield put(userUpdateSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error?.message as string);
      yield put(userUpdateFailed(error?.message as string));
    }
  }
}

function* userSaga() {
  yield takeEvery(USER_LOGIN, userLogin);
  yield takeEvery(UPDATE_USER, updateUser);
}

export default userSaga;
