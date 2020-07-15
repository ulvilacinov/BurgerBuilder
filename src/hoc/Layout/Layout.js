import React, { useState } from "react";

import classes from "../Layout/Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = props => {
    const [ showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawOpenedHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (<>
        <Toolbar
            isAuth={props.isAuth}
            opened={sideDrawOpenedHandler} />
        <SideDrawer
            open={showSideDrawer}
            closed={sideDrawClosedHandler}
            isAuth={props.isAuth}
        />
        <main className={classes.Content}>
            {props.children}
        </main>
    </>);

}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);