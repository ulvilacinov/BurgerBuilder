import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render() {
        return (<div>
            {this.props.loading ? <Spinner /> : this.props.orders.map(order => {
                return <Order
                    ingredients={order.ingredients}
                    totalPrice={order.price}
                    key={order.id}
                    remove={() => this.props.onDeleteOrder(order.id,this.props.token)}
                />
            })}
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token,userId) => dispatch(actions.fetchOrders(token,userId)),
        onDeleteOrder: (orderId,token) => dispatch(actions.removeOrder(orderId,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHanlder(Orders, axios));