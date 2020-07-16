import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../../axios-order";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";


const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false,
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Email'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: '', displayValue: 'Please Select' },
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false
        }
    })
    const [formIsValid, setFormIsValid] = useState(false);



    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (var key in orderForm) {
            formData[key] = orderForm[key].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        }

        props.onOrderBurger(order, props.token);

    }

    const inputChangeHandler = (event, identifier) => {
        const updatedFormElement = updateObject(orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[identifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm,
            {
                [identifier]: updatedFormElement
            });

        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    const formElements = [];
    for (let key in orderForm) {
        formElements.push({
            id: key,
            config: orderForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {
                formElements.map(formElement => {
                    return <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangeHandler(event, formElement.id)} />
                })
            }

            <Button btnType='Success' disabled={!formIsValid}>ORDER</Button>
        </form>
    )
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>);

}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));