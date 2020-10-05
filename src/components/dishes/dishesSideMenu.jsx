
import React from 'react';
import SideNav from '../common/sideNav/sideNav'; 
import { useHistory } from "react-router-dom";
import getResponsiveDetails from '../common/mediaQuery/mediaQuery';
import { StyledButton } from '../common/forms/styledButton';

const SideDish = () => {
    let history = useHistory();
    const {isDesktopOrLaptop} = getResponsiveDetails();
    if(!isDesktopOrLaptop){
        return [];
    }
    const DishSideMenu = () => {
        const paths = [{path: '/Dishes/menu',label:'Menu'},
            {path: '/Dishes/dishesList',label:'Dishes List'},
            {path: '/Dishes/dishCreation',label:'Create Dish'},
            {path: '/Menu',label:'yxxx'}];

        return <div className="dishesNavData">
        {
            paths.map(t => (
                <StyledButton key={t.label}
                    title={t.label}
                    width='100%'
                    color={window.location.pathname == t.path ? '#86033e' : '#fff'}
                    //background={window.location.pathname == t.path ? '#86033e' : '#fff'}
                    onClick={()=> history.push(t.path)}/>
            ))
        }
        </div>
    }
    return <SideNav InsideMenu = {DishSideMenu}/>
}
export default SideDish;