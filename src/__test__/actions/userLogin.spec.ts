
import { COMMON_ERROR } from "../../constants/common";
import {
  CLEAR_LOGIN_USER,
  UPDATE_USER,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS,
} from "../../constants/user";


import {
  clearLoginUser,
  loginFailed,
  loginSuccess,
  updateUser,
  userLogin,
  userUpdateFailed,
  userUpdateSuccess,
} from "../../redux/actions/userLogin";

const loginDetails = {
  email: "bapu.pradhan@hcltech.com",
  password: "Bapu@123",
};

const user = {
  name: "Divya",
  email: "divyan@hcltech.com",
  password: "diva@123",
  role: '',
  projects: '',
  managerId: '',
  token: '',
  user: ''

};

const actions = {
  userLogin: {
    type: USER_LOGIN,
    payload: loginDetails,
  },
  loginSuccess: {
    type: USER_LOGIN_SUCCESS,
    payload: user,
  },
  loginFailed: {
    type: USER_LOGIN_FAILED,
    payload: COMMON_ERROR,
  },
  clearLoginUser: {
    type: CLEAR_LOGIN_USER,
  },
  updateUser: {
    type: UPDATE_USER
  },
  userUpdateSuccess: {
    type: USER_UPDATE_SUCCESS
  },
  userUpdateFailed: {
    type: USER_UPDATE_FAILED
  }
};

describe("Given cart action creator userLogin", () => {
  describe("When calling userLogin action creator", () => {
    it("will return an action", () => {
      expect(userLogin(loginDetails)).toEqual(actions?.userLogin);
    });
  });
});

describe("Given cart action creator loginSuccess", () => {
  describe("When calling loginSuccess action creator", () => {
    it("will return an action", () => {
      expect(loginSuccess(user)).toEqual(actions?.loginSuccess);
    });
  });
});

describe("Given cart action creator petsFetchFailed", () => {
  describe("When calling petsFetchFailed action creator", () => {
    it("will return an obj", () => {
      expect(loginFailed(COMMON_ERROR)).toEqual(actions?.loginFailed);
    });
  });
});

describe("Given cart action creator clearLoginUser", () => {
  describe("When calling clearLoginUser action creator", () => {
    it("will return an obj", () => {
      expect(clearLoginUser()).toEqual(actions?.clearLoginUser);
    });
  });
});

describe("Given cart action creator updateUser", () => {
  describe("When calling updateUser action creator", () => {
    it("will return an obj", () => {
      expect(updateUser(user)).toEqual(actions?.updateUser);
    });
  });
});
describe("Given cart action creator userUpdateSuccess", () => {
  describe("When calling userUpdateSuccess action creator", () => {
    it("will return an obj", () => {
      expect(userUpdateSuccess(user)).toEqual(actions?.userUpdateSuccess);
    });
  });
});
describe("Given cart action creator userUpdateFailed", () => {
  describe("When calling userUpdateFailed action creator", () => {
    it("will return an obj", () => {
      expect(userUpdateFailed(COMMON_ERROR)).toEqual(actions?.userUpdateFailed);
    });
  });
});