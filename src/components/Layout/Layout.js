import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import classes from "../Layout/Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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
        return(<Aux>
            <Toolbar opened={this.sideDrawOpenedHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawClosedHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>);
    }
}

export default Layout;