import {
  CLEAR_LOGIN_USER,
  UPDATE_USER,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS,
} from "../../constants/user";
import { defaultReduxState, IReducer } from "../../interfaces/store";
import { defaultUser, IUser, IUserLogin } from "../../interfaces/user";

const initialState: IReducer<any> = defaultReduxState(defaultUser);

const loginUserReducer = (
  state = initialState,
  action: { type: string; payload?: IUser | string | IUserLogin }
): IReducer<IUser> => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, isLoading: true };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload as IUser,
        isLoading: false,
        error: "",
      };

    case USER_LOGIN_FAILED:
      return { ...state, isLoading: false, error: action.payload as string };

    case UPDATE_USER:
      return { ...state, isLoading: true };

    case USER_UPDATE_SUCCESS:
      return { ...state, isLoading: false, data: action.payload as IUser };

    case USER_UPDATE_FAILED:
      return { ...state, isLoading: false, error: action.payload as string };

    case CLEAR_LOGIN_USER:
      return initialState;

    default:
      return state;
  }
};

export default loginUserReducer;
