import { COMMON_ERROR } from "../../constants/common";
import {
  clearLoginUser,
  loginFailed,
  loginSuccess,
  userLogin,
} from "../../redux/actions/userLogin";
import loginUserReducer from "../../redux/reducers/userLoginReducer";

const initialState = {
  data: {
    name: "",
    mobile: "",
    email: "",
    password: "",
  },
  error: "",
  isLoading: false,
};

const state = initialState;

const userDetails = {
  user: '',
  name: "divya",
  email: "divya@hcltech.com",
  password: "divya@123",
  mobile: "7008545948",
  role: '',
  token: '',
  managerId: '',
  sapId: ''
};

const user = {
  email: "divya@hcltech.com",
  password: "diva@123",
};

describe("Given loginUserReducer", () => {
  describe("When calling loginUserReducer with USER_LOGIN action", () => {
    it("will return state with loading true", () => {
      expect(loginUserReducer(state, userLogin(user))).toEqual({
        ...state,
        isLoading: true,
      });
    });
  });

  describe("When calling loginUserReducer with USER_LOGIN_SUCCESS action", () => {
    it("will return state with cart data", () => {
      expect(loginUserReducer(state, loginSuccess(userDetails))).toEqual({
        ...state,
        isLoading: false,
        data: userDetails,
        error: "",
      });
    });
  });

  describe("When calling loginUserReducer with USER_LOGIN_FAILED action", () => {
    it("will return state with error", () => {
      expect(loginUserReducer(state, loginFailed(COMMON_ERROR))).toEqual({
        ...state,
        isLoading: false,
        error: COMMON_ERROR,
      });
    });
  });

  describe("When calling loginUserReducer with CLEAR_LOGIN_USER action", () => {
    it("will return state with error", () => {
      expect(loginUserReducer(state, clearLoginUser())).toEqual(initialState);
    });
  });

  describe("When calling loginUserReducer with any other action", () => {
    it("will return state without updating the state", () => {
      expect(loginUserReducer(state, { type: "default" })).toEqual(state);
    });
  });
});
