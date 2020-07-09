import React, { Component } from "react";

import classes from "../Layout/Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

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
            <Toolbar 
                isAuth={this.props.isAuth}
                opened={this.sideDrawOpenedHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawClosedHandler} 
                isAuth={this.props.isAuth}    
                />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </>);
    }
}

const mapStateToProps = state  => {
    return {
        isAuth: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);