import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        axios.get("/orders.json")
            .then(response => {
                const fetchedOrder = [];
                for (let key in response.data) {
                    fetchedOrder.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({ orders: fetchedOrder, loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            })
    }
    removeOrderHanlder = (id) => {
        this.setState({loading: true });
        axios.delete("/orders/" + id + ".json")
            .then(res => {
                this.loadData();
            })
    }

    render() {
        return (<div>
            {this.state.loading ? <Spinner /> : this.state.orders.map(order => {
                return <Order
                    ingredients={order.ingredients}
                    totalPrice={order.price}
                    key={order.id}
                    remove={() => this.removeOrderHanlder(order.id)}
                />
            })}
        </div>);
    }
}

export default withErrorHanlder(Orders, axios);