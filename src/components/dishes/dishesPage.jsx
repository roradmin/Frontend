import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadAndStoreDishes} from '../../redux/actions/dishesActions';
import DishCreation from './dishCreation';
import DishesList from './dishesList';
import DishSideMenu from './dishesSideMenu';
import MenuPage from '../menu/menuPage';
import getResponsiveDetails from '../common/mediaQuery/mediaQuery';

import './dishes.scss';

const DishesPage = () => {
    const dishesList = useSelector(state => state.dishes.dishesList);
    const dispatch = useDispatch();
    const pathname = window.location.pathname;
    const {isDesktopOrLaptop} = getResponsiveDetails();

    useEffect(() => {
        //_.isEmpty(dishesList) && dispatch(loadAndStoreDishes());
        dispatch(loadAndStoreDishes());
    },[]);

    const onDishFormClosed = (dishData) => {
        console.log(dishData);
    }
    const HandleComponents = () => {
        switch(pathname){
            case '/Dishes/dishCreation':
                return <DishCreation />
            case '/Dishes/menu':
                return <MenuPage />
            default: return  <DishesList dishesList={dishesList}/>;
        }
    }

    return <div className={"dishesPageWrapper " + isDesktopOrLaptop}>
        <DishSideMenu/>
        <div className="dishComponent">
            {
                React.useMemo(() => <HandleComponents /> , [pathname,dishesList])
            }
        </div>
    </div>
}

export default DishesPage;