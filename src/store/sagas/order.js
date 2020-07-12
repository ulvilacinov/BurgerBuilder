import * as actions from "../actions/index";
import {put} from "redux-saga/effects";
import axios from "../../axios-order";

export function* purchaseBurgerSaga(action) {
    debugger;
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post("/orders.json?auth=" + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    }
    catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    };
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrderStart());
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    try {
        const response =yield axios.get('/orders.json' + queryParams);
        const fetchedOrder = [];
        for (let key in response.data) {
            fetchedOrder.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrderSuccess(fetchedOrder));
    }
    catch (error) {
        yield put(actions.fetchOrderFailed(error));
    }
}

export function* removeOrderSaga(action) {
    debugger;
    yield put(actions.fetchOrderStart());
    try {
        const queryParams = `?auth=${action.token}`;
        yield axios.delete("/orders/" + action.id+ + ".json" +queryParams);
        yield put(actions.fetchOrders());
    } catch (error) {
        yield put(actions.fetchOrderFailed(error));
    }
}