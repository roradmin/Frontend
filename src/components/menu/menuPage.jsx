import React,{useState,useContext,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AppContext from '../appContext';
import Menu from './menu';
import _ from 'lodash';

const MenuPage = () => {
    const [section,setCurrentSection] = useState(null);
    return <div className="MenuPage">
        <Menu onSelectSection={setCurrentSection}/>
        <div className="showMenuData">
           <ShowCurrentDishes section={section}/>
        </div>
    </div>
}

const ShowCurrentDishes = ({section}) => {
    const [showData,setShowData] = useState([]);
    const dishesList = useSelector(state => state.dishes.dishesList) || [];

    useEffect(() => {
        !_.isEmpty(dishesList) && setRelevantData();
    },[section]);

    const setRelevantData = () => {
        const filtereDishes = dishesList.filter(dish => dish.category.name == section);
        console.log(filtereDishes);
        setShowData(filtereDishes);
    }

    return <ul>
        {
            !_.isEmpty(showData) && showData.map(data => (
                <li key={data.name} data-before-content={data.name}>{data.name}</li>
            ))
        }
    </ul>
}

export default MenuPage; 