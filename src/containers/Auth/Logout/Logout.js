
import React, {  useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";

const Logout = props => {

    const {onLogout} = props;

    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Redirect to="/" />

}

const mapDispatchToState = dispatch => {
    return {
        onLogout: () => (dispatch(actions.authLogout()))
    }
}

export default connect(null, mapDispatchToState)(Logout);