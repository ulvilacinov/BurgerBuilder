import React, { Component } from "react";
import axios from "../../axios-order";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICES = {
    salad: 0.3,
    meat: 1.5,
    bacon: 0.7,
    cheese: 0.4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get("https://react-my-burger-548e2.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const additionPrice = INGREDIENT_PRICES[type];
        const totalPrice = additionPrice + this.state.totalPrice;
        this.setState({ ingredients: updatedIngredient, totalPrice: totalPrice });
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const totalPrice = this.state.totalPrice - priceDeduction;
        this.setState({ ingredients: updatedIngredient, totalPrice: totalPrice });
        this.updatePurchaseState(updatedIngredient);
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //     this.setState({loading: true});
        //   //  alert("You continue!!!");
        //   const order = {
        //       ingredients: this.state.ingredients,
        //       price: this.state.totalPrice,
        //       customer: {
        //           name: "Ulvi Laçınov",
        //           address: {
        //               street: "Yumurtacı Abdı bey",
        //               zipCode: "34011",
        //               country: "Turkey"
        //           },
        //           email: "ulvilacinov@gmail.com"
        //       },
        //       deliveryMethod: "fastest"
        //   }
        //   axios.post("/orders.json",order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });
        const queryParams = [];
        for (let item in this.state.ingredients) {
            queryParams.push(encodeURIComponent(item) + '=' + encodeURIComponent(this.state.ingredients[item]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        });
    }

    render() {
        const disableInfo = { ...this.state.ingredients };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p style={{ textAlign: "center" }}>Ingredients can't be loaded! </p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Auxiliary>);

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);