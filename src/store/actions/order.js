import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json", orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get("/orders.json")
            .then(response => {
                const fetchedOrder = [];
                for (let key in response.data) {
                    fetchedOrder.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrder));
            })
            .catch(error => {
                dispatch(fetchOrderFailed(error));
            })
    }
}


export const removeOrder = (id) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.delete("/orders/" + id + ".json")
            .then(res => {
               dispatch(fetchOrders());
            })
    }
}