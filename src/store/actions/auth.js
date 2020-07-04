import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error,
    };
};

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAutTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYb_w97EYRs6YdeOYFTwbIvhpxZ8QnZKI';
    if (!isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYb_w97EYRs6YdeOYFTwbIvhpxZ8QnZKI';
    }
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url, authData)
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem("token",response.data.idToken);
                localStorage.setItem("expirationTime", expirationTime);
                localStorage.setItem("userId", response.data.localId);
                dispatch(authSucess(response.data.idToken, response.data.localId));
                dispatch(checkAutTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error));
            })
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = dispatch => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(authLogout());
        }else{
            const expirationTime = new Date(localStorage.getItem("expirationTime"));
            if(expirationTime <= new Date()){
                dispatch(authLogout());
            }else{
                const userId = localStorage.getItem("userId");
                dispatch(authSucess(token,userId));
                dispatch(checkAutTimeout((expirationTime.getTime()- new Date().getTime())/1000));
            }
        }
    }
}