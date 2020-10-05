import React from 'react';
import {withRouter} from 'react-router-dom';
import getResponsiveDetails from '../common/mediaQuery/mediaQuery';
import MobileMenu from '../common/mobileMenu/mobileMenu';
import DesktopHeader from './desktopHeader';
import './header.scss';

const Header = () =>{
  const ShowRelevantHeader = () => {
    const mediaQuery = getResponsiveDetails();
    if(mediaQuery.isMobile){
      return <MobileMenu />
    }else if(mediaQuery.isTablet){
      return <MobileMenu />
    } else if(mediaQuery.isDesktopOrLaptop){
      return <DesktopHeader />
  } else return <h2>{Object.keys(mediaQuery).find(t => (mediaQuery[t] === true))}</h2>
  }
    return(
        <div className="headerWrapper">
          <ShowRelevantHeader />
        </div>
    );
}


export default withRouter(Header);
