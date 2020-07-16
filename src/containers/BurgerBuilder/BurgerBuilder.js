import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "../../axios-order";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";


const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => {
        return state.burger.ingredients;
    });

    const totalPrc= useSelector(state => {
        return state.burger.totalPrice;
    });

    const error = useSelector(state => {
        return state.burger.error;
    });

    const isAuth = useSelector(state => {
        return state.auth.token !== null;
    });

    const onIngredientAdded= (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemove= (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients= useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase= () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath= (path) => dispatch(actions.setAuthRedirectPath(path));

    
    useEffect(() => {
         onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuth) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push("/checkout");
    }

    const disableInfo = { ...ings };
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p style={{ textAlign: "center" }}>Ingredients can't be loaded! </p> : <Spinner />;
    if (ings) {
        burger = (
            <Auxiliary>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemove={onIngredientRemove}
                    disabled={disableInfo}
                    price={totalPrc}
                    isAuth={isAuth}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler} />
            </Auxiliary>);

        orderSummary = <OrderSummary
            ingredients={ings}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price={totalPrc} />
    }


    return (
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
}



export default withErrorHandler(BurgerBuilder, axios);