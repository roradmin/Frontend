import React from 'react';
import TopBox from './topBox';
import _ from 'lodash';
import './dashboard.scss';


const dashboard = ({
  Intro = () => <h3>This is intro...</h3>,
  Top = null,
  MainComponent = () => <h3>Main Component</h3>,
  DashLeft,
  DashRight,// =  () => <ul><li>a</li><li>a</li><li>a</li><li>a</li><li>a</li></ul>,
  Bottom = null
}) => {
  const dashClassName = `dashboardWrapper ${Bottom ? 'Bottom ': ''} ${DashLeft ? 'DashLeft ': ''} ${DashRight ? 'DashRight': ''}`;
  return (
    <div className = {dashClassName}>
      {
        Intro && <div className="dashTopIntro"><Intro/></div>
      }
      <div className="dashTop">
          {Top && <Top/>}
      </div>
      <div className="mainContent">
        {
          DashLeft && <div className="dashLeftSide">
            <DashLeft />
          </div>
        }
          <div className="content">
            <MainComponent />
          </div>
        {
         DashRight && <div className="dashRightSide">
            <DashRight />
         </div>
        }
      </div>
      {
      !_.isEmpty(Bottom) && <div className="bottom">
        {
          Bottom.map(t => (<TopBox key={t}>{t}</TopBox>))
        }
      </div>
      }
    </div>
  )
}
export default dashboard;