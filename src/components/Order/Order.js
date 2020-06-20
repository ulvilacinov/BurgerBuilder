import React from "react";

import classes from "./Order.module.css";

const Order = (props) => {
    const ingredients = [];
    for (let item in props.ingredients) {
        ingredients.push({
            name: item,
            amount: props.ingredients[item]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px',
                border: '1px solid #ccc',
            }}
            key={ig.name}>
            
            {ig.name} ({ig.amount})
        </span>
    })
    return (<div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Total Price <strong>USD {props.totalPrice}</strong></p>
        <button onClick={props.remove}>Remove</button>
    </div>)
}



export default Order;