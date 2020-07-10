import { put, delay } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

export function* logoutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationTime");
    yield localStorage.removeItem("userId");
    yield put(actions.authLogoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.authLogout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYb_w97EYRs6YdeOYFTwbIvhpxZ8QnZKI';
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYb_w97EYRs6YdeOYFTwbIvhpxZ8QnZKI';
    }
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationTime = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem("token", response.data.idToken);
        yield localStorage.setItem("expirationTime", expirationTime);
        yield localStorage.setItem("userId", response.data.localId);
        yield put(actions.authSucess(response.data.idToken, response.data.localId));
        yield put(actions.checkAutTimeout(response.data.expiresIn));
    }
    catch (error) {
        yield put(actions.authFailed(error.response.data.error));
    }
}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem("token");
    if(!token){
        yield put(actions.authLogout());
    }else{
        const expirationTime = yield new Date(localStorage.getItem("expirationTime"));
        if(expirationTime <= new Date()){
            yield put(actions.authLogout());
        }else{
            const userId =yield localStorage.getItem("userId");
            yield put(actions.authSucess(token,userId));
            yield put(actions.checkAutTimeout((expirationTime.getTime()- new Date().getTime())/1000));
        }
    }
}