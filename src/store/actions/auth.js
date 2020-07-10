import * as actionTypes from "./actionTypes";

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
    // localStorage.removeItem("token");
    // localStorage.removeItem("expirationTime");
    // localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const authLogoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAutTimeout = expirationTime => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
}

export const auth = (email, password, isSignUp) => {
   return {
       type: actionTypes.AUTH_USER,
       email: email,
       password: password,
       isSignUp: isSignUp
   }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = dispatch => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}