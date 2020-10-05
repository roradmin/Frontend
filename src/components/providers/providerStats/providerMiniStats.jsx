import React,{useMemo} from 'react';
import styled from 'styled-components';
import { StatsCube } from './providerStatsCube';

const ProviderMiniStats = props => {
    const monthQueries = [
        {
            query: 'action=sum&from=lastmonth',
            label: 'ILS',
            description: 'Expenses Last Month',
            steps: [0,1,2]
        },{
            query: 'action=count&canceled=true&from=lastmonth',
            description: 'Canceled Orders',
        },{
            query: 'action=nextOrder',
            description: 'Next Order',
            label: 'Days'
        }
    ];
    const yearQueries = [
        {
            query: 'action=sum&from=lastyear',
            description: 'Expenses Last Year',
            label:'ILS',
        },{
            query: 'action=count&from=lastyear&active=false',
            description: 'Closed Orders',
        }
    ];
  return useMemo(() => <MiniStatusRow>
      <div className="leftContent">{
        monthQueries.map(query => <StatsCube
            currentProvider = {props.currentProvider}
            query = {query}
            key = {query.query}
        />)
        }</div><div className="rightContent">{  
        yearQueries.map(query => <StatsCube
            currentProvider = {props.currentProvider}
            query = {query}
            key = {query.query}
        />)}</div>
        </MiniStatusRow>,[props.currentProvider])
}
const MiniStatusRow = styled.div`
    width:100%;
    display:flex;
    flex-wrap: wrap;
    
    .leftContent{
        flex-grow:1;
        display: flex;
        justify-content: center;
    }
    .rightContent{
        display: flex;
        justify-content: center;
        flex-grow: 2;
    }
`;

export default ProviderMiniStats;