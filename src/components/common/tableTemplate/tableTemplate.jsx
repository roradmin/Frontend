import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import TableTemplateBase from './tableTemplateBase';
import './tableTemplate.scss';

const TableTemplate = ({seats,tableName,existsTable}) => {
const [styledProps,setStyledProps] = useState({});

useEffect(() => console.log(existsTable ? '-------SideT--------' : '-------CanvasT------'));
useEffect(() => {
    setStyledProps(
    existsTable ? {
      width: seats.top * 1.5 + 'vw',
      height: seats.right * 2 + 'vh',
      backgroundColor: '#333',
      margin: '0 auto',
      maxWidth: '100%',
      minWidth: '3em',
      minHeight: '3em'
    }:{
        width: seats.top * 1.5 + 'vw',
        height: seats.right * 2 + 'vh',
        backgroundColor: '#333',
        margin: '0 auto',
        maxWidth: '100%',
        minWidth: '90px',
        minHeight: '90px'
    });          
  },[seats]);
  const tableSize = Object.keys(seats).map(pt => seats[pt]).reduce((total,cur) => total += cur,0);
  
  return <TableTemplateBase 
    seats = {seats}
    tableLabel = {tableSize}
    cstmStyle = {styledProps}
  />    
}

export default TableTemplate;
