import React,{useState} from 'react';
import { routes } from '../forms/systemRoutes';
import {FaBurn} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux';
import './sideContent.scss';
import _ from 'lodash';

const SideContent = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [currentOpen,setCurrentOpen] = useState(null);
      
    const isPathIncludesName = (url) => window.location.pathname.toLowerCase().startsWith(url.toLowerCase());
    const isExactlyPath = (url) => window.location.pathname.toLowerCase() == url.toLowerCase();

    const redirect = (link,pathArr = null) => {
        console.log(link);
        history.push(link);
        dispatch({
            type: "SET_CURRENTPATH",
            data: pathArr ? pathArr : [currentOpen,link.substring(0)]
        });         
    }
    const onParentClicked = (label,hasChildrens,link) => {
        if(hasChildrens){
            setCurrentOpen(label == currentOpen ? null : label);
        }else{     // route has changed - redirect needed
            setCurrentOpen(null);
            redirect(link,[label]);
        }
    }
    return React.useMemo(
        () => <div className = "sideContent"><ul className = "routesList">{
        routes.map(rte => <li
            key={rte.label}
            onClick={() => onParentClicked(rte.label,!_.isEmpty(rte.childrens),rte.link)}
            >
            <span className={isPathIncludesName(`/${rte.label}`) ? 'link current':'link'}>
                {rte.icon}
                <span>
                    {rte.label}
                </span>
            </span>
            {rte.childrens && <ul
                className = {(rte.label == currentOpen || isPathIncludesName(`/${rte.label}`)) ? 'subMenu open':'subMenu'}
            >
                {rte.childrens.map(childM => <li
                    key = {childM.link}
                    className = {isExactlyPath(`${childM.link}`) ? 'subItem current':'subItem'}>
                    <FaBurn />          
                    <span onClick = {() => redirect(childM.link)}>
                        {childM.label}
                    </span>
                </li>)}
            </ul>}
        </li>)
    }</ul></div>,[currentOpen,window.location.pathname]);
}

export default SideContent;