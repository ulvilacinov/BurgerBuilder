import React, { Component } from "react";
import CheckoutSummary from "../../components/Burger/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: {}
    }

    componentDidMount(){
        const ingredients = {};
        const query = new URLSearchParams(this.props.location.search);
        for(let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/user-data");
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                     />
            </div>
        );
    }
}

export default Checkout;