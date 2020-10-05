import React from 'react';
import ReduxDishForm from './reduxDishForm';

const DishCreation = () => {
    const onDishFormClosed = (dishData) => {
        console.log(dishData);
    }
    return <ReduxDishForm onSubmit={(val) => onDishFormClosed(val)} currentDish={null}/>
}

export default DishCreation;