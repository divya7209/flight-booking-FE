import { call, put, takeEvery } from "@redux-saga/core/effects";
import { USER_LOGIN, UPDATE_USER } from "../../constants/user";
import { IUser, IUserLogin } from "../../interfaces/user";
import { IAction } from "../../interfaces/action";
import userSaga, { fetchUser, updateUser, userLogin } from "../../redux/saga/user";
import { loginFailed, loginSuccess, userUpdateFailed, userUpdateSuccess } from "../../redux/actions/userLogin";

describe('userSaga', () => {
    const genObject = userSaga();

    it('should wait for every USER_LOGIN action and call userLogin', () => {
        expect(genObject.next().value).toEqual(takeEvery(USER_LOGIN, userLogin));
    });

    it('should wait for every UPDATE_USER action and call updateUser', () => {
        expect(genObject.next().value).toEqual(takeEvery(UPDATE_USER, updateUser));
    });
});

describe('userLogin', () => {
    const mockPayload: IUserLogin = {
        email: 'divya@gmail.com',
        password: '12323'
    };
    const action: IAction<IUserLogin> = {
        type: USER_LOGIN,
        payload: mockPayload,
    };
    const user: IUser = {
        _id: "6",
        email: "divya@gmail.com",
        password: "test3",
        role: "user",
        user: undefined
    };
    const error = new Error('invalid email and password');

    it('should handle login success', () => {
        const genObject = userLogin(action);
        expect(genObject.next().value).toEqual(call(fetchUser, {
            values: mockPayload,
            method: "POST",
            path: "users/login",
        }));
        expect(genObject.next(user).value).toEqual(put(loginSuccess(user)));
        expect(genObject.next().done).toBe(true);
    });

    it('should handle login failure', () => {
        const genObject = userLogin(action);
        expect(genObject.next().value).toEqual(call(fetchUser, {
            values: mockPayload,
            method: "POST",
            path: "users/login",
        }));
        expect(genObject.throw(error).value).toEqual(put(loginFailed(error.message)));
        expect(genObject.next().done).toBe(true);
    });
});

describe('updateUser', () => {
    const mockPayload: IUser = {
        _id: "6",
        email: "divya@gmail.com",
        password: "test3",
        role: "user",
        user: undefined
    };
    const action: IAction<IUser> = {
        type: UPDATE_USER,
        payload: mockPayload,
    };
    const error = new Error('Error updating user');

    it('should handle update user success', () => {
        const genObject = updateUser(action);
        expect(genObject.next().value).toEqual(call(fetchUser, {
            values: mockPayload,
            method: "PATCH",
            path: `users/${mockPayload._id}`,
        }));
        expect(genObject.next(mockPayload).value).toEqual(put(userUpdateSuccess(mockPayload)));
        expect(genObject.next().done).toBe(true);
    });

    it('should handle update user failure', () => {
        const genObject = updateUser(action);
        expect(genObject.next().value).toEqual(call(fetchUser, {
            values: mockPayload,
            method: "PATCH",
            path: `users/${mockPayload._id}`,
        }));
        expect(genObject.throw(error).value).toEqual(put(userUpdateFailed(error.message)));
        expect(genObject.next().done).toBe(true);
    });
});