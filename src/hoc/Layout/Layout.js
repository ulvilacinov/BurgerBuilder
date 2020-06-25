import React, { Component } from "react";

import classes from "../Layout/Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawOpenedHandler = () => {
        this.setState( (prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer};
        });
    }
    
    render(){
        return(<>
            <Toolbar opened={this.sideDrawOpenedHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawClosedHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </>);
    }
}

export default Layout;