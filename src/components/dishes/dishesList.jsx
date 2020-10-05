import React,{useState,useEffect,useContext} from 'react';
import _ from 'lodash';

const DishesList = ({dishesList}) => {
console.log(dishesList);
    return <>
        <h1>Dishes List</h1>
        <div className="dishesList">
            {
                !_.isEmpty(dishesList) && dishesList.map(dish => {
                    return <div className="dishItem" key={dish.name}>
                        <h2>{dish.name}</h2>
                    </div>
                })
            }
        </div>
    </>
}

export default DishesList;