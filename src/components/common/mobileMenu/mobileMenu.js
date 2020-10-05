import React,{useState,useEffect,useContext} from 'react';
import {FaShippingFast,FaHamburger,FaDolly,FaChevronUp,FaHome} from "react-icons/fa";
import {MdAccessibility,MdFlipToFront,MdRestaurantMenu} from 'react-icons/md';
import {FiLogOut} from 'react-icons/fi';
import {Link,withRouter} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppContext from '../../appContext';
import './mobileMenu.scss';

const MobileMenu = () => {
  const [openedMenu,setOpenedMenu] = useState(false);
  const {clearCookie} = useContext(AppContext);
  const userLoggedIn = useSelector(state => state.user.loggedInUser);

    useEffect(() => {
        console.log(openedMenu);
    },[openedMenu]);

const highlightCurrent = (url) => window.location.pathname.startsWith(url)?'link current':'link';
    const linksListWithIcons = [
        {
            linkTo: "/",
            label: 'Home',
            icon: FaHome
        },{
            linkTo: "/Providers",
            label: 'Providers',
            icon: FaShippingFast
        },{
            linkTo: "/ingredients",
            label: 'Ingredients',
            icon: MdFlipToFront
        },{
            linkTo: "/Dishes",
            label: 'Dishes',
            icon: MdRestaurantMenu
        },{
            linkTo:"/permissions",
            label: 'Permissions',
            icon: MdAccessibility
        }
    ];
    return  <div className="mobileMenuWrapper">
      <nav role="navigation">
        <div className="menuToggle">
          <input type="checkbox" />
            <span className="openingIcon"></span>
            <span className="openingIcon"></span>
            <span className="openingIcon"></span>
        <ul className="menu">
            {
                userLoggedIn && <li className="sideUserDetails">
                    <span>{
                    `${userLoggedIn.firstName} ${userLoggedIn.lastName}`
                    }</span>
                    <span onClick = {() => clearCookie()}>Logout</span>
            </li>
            }
        {
                linksListWithIcons.map(item => {
                    const Icon = item.icon;
                    return <li key={item.linkTo}>
                        <Icon size='32px' />
                        <Link
                            to={item.linkTo}
                            className={highlightCurrent(item.linkTo)}
                        >
                            {item.label}
                        </Link>
                    </li>
                })
        }
        </ul>
       </div>
      </nav>
    </div>
}


export default MobileMenu;