import React,{useState,useEffect,useContext} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import CircleAvatar from './circleAvatar';
import SideContent from './sideContent';
import AppContext from '../../appContext';
import {FaPowerOff} from 'react-icons/fa';
import styled from 'styled-components';
import _ from 'lodash';

const MainSideNav = () => {
    const loginDetails = useSelector(state => state.user.loggedInUser);
    const [fullName,setFullName] = useState(null);
    const [avatarImg,setAvatarImg] = useState(null);
    const {clearCookie} = useContext(AppContext);

    useEffect(() => { 
        const firstName = _.get(loginDetails,'firstName',null);
        const lastName = _.get(loginDetails,'lastName',null);
        const userAvatar = _.get(loginDetails,['picture','data','url'],null);
        firstName && lastName && setFullName(`${firstName} ${lastName}`) && setAvatarImg(userAvatar);
      },[loginDetails]);

    return <MainSideNavItem>
       <div className = "sideUser">
            <CircleAvatar avatarImg = {avatarImg}/>
            <h4>{fullName}</h4>
       </div>
       <SideContent/>
          <label className="logout" onClick={()=> clearCookie()}>
            <FaPowerOff />
            Logout
          </label>
    </MainSideNavItem>
}
const MainSideNavItem = styled.div`
    background-color: #041c27;
    height: 100%;
    width: 200px;
    display: grid;
    grid-template-areas: "sideUser" "sideContent";
    grid-template-rows: 1fr 9fr;
    grid-area: sidenav;
    position: relative;
    .sideUser{
        background-color: #0a2835;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-bottom: 1pt solid #ccc;

        h4{
            color: #eee;
            font-variant-caps: all-small-caps;
            font-size: 15pt;
            margin: 0;
        }

    }
    .sideContent{
        background-color: #0a2835;
        padding-top: 12%;
    }
    .logout{
      position:absolute;
      bottom:0;
      color:#fff;
      cursor:pointer;
    }
`;
export default MainSideNav;