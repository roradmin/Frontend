import React,{useState,useEffect} from 'react';
import './sideNav.scss';

const SideNav = ({InsideMenu}) => {
    return <div className="sideNavWrapper">
        <InsideMenu />
    </div>
}

export default SideNav;