import React, {useContext,useRef,useState,useLayoutEffect,useEffect} from "react";
import {useDrop} from "react-dnd";
import DraggableTable from "./draggableTable";
import { TablesAreaContext } from '../tablesArea/tablesArea';
import _ from 'lodash';
import './droppableCanvas.scss';

const DroppableCanvas = () => {
  const wrapperRef = useRef(null);
  const {tablesList,setTablesList,setNewTable,areaBounds,setAreaBounds} = useContext(TablesAreaContext);

  useEffect(() => {
    window.addEventListener('resize', () => getCanvasBounds());
    getCanvasBounds();
  },[]);
  useLayoutEffect(() => getCanvasBounds());

  const getCanvasBounds = () => {
    if(wrapperRef && wrapperRef.current){
      const {right,bottom,width,height} = wrapperRef?.current?.getBoundingClientRect();
      console.log('right: ',right,'bottom: ',bottom,' width: ',width,' height: ',height);
      if(areaBounds.height != Math.round(height) || areaBounds.width != Math.round(width)){
       setAreaBounds({height:Math.round(height),width: Math.round(width)});
      }
    }
  }
  const [{canDrop, isOver}, drop] = useDrop({
    accept: "table",
    drop: (item, monitor) => onDropItem(item,monitor),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const onDropItem = (item, monitor)  => {
    const {existsTable,tableInfo} = item;
    const canvasGrid = 60;

    if(!existsTable){
      const delta = monitor.getClientOffset();
      console.log('delta: ',delta);
      const left = (Math.round(delta.x / canvasGrid) * canvasGrid);
      const top =  (Math.round(delta.y / canvasGrid) * canvasGrid);
      setNewTable({...item.tableInfo,location: {x: left,y:top}});
    }else{
      const canvasDelta = monitor.getDifferenceFromInitialOffset();
      console.log('canvasDelta: ',canvasDelta);
      const delta = monitor.getClientOffset();
      console.log('delta: ',delta);
      const xLocation = _.get(item,['tableInfo','location','x'],0);
      const yLocation = _.get(item,['tableInfo','location','y'],0);

      const left = Math.round((xLocation + canvasDelta.x));//(Math.round((xLocation + canvasDelta.x) / canvasGrid) * canvasGrid);
      const top =  Math.round((yLocation + canvasDelta.y));//(Math.round((yLocation + canvasDelta.y) / canvasGrid) * canvasGrid);
      if(delta.y > areaBounds.height){
        // need to find the current dropping location and find if this element out of scope
      }
      moveTableInCanvas(item, left, top);
    }
    return undefined;
  }
  const moveTableInCanvas = (item, left, top) => {
    console.log(item, left, top);
    const {tableInfo:{tableName}} = item;
    const copy = [...tablesList];
    const findcurrent = copy.findIndex(t => t.tableName === tableName);
    if(findcurrent !== -1){
      copy[findcurrent] = {...copy[findcurrent],location: {x: left,y:top}};
      setTablesList(copy);
    }else{
      alert('cannot find table');
    }
  };

  const isActive = canDrop && isOver;   // canDrop -> need to represent if the current location is available
  return (
    _.isEmpty(tablesList) && areaBounds.width == null && [] || <div className = 'DroppableCanvas' >
      <h2 style={{color: '#333'}}>
        {isActive ? 'Release to set ' : 'Drag a table here '}
        ({areaBounds.height},{areaBounds.width})
      </h2>
      <div ref = {drop}
           className = {`areaWrapper ${canDrop ? 'canDrop' : ''} ${isOver ? 'isOver' : ''}`}
      >
      <div ref = {wrapperRef}className = "tblsArea">
      {
        tablesList.map(tblData => <DraggableTable
            tblProprties = {tblData}
            key = {tblData.tableName + tblData.location.x + tblData.location.y}
            type = {'table'}
            existsTable = {true} 
          />)
      }
      </div>
      </div>
    </div>
  );
};
export default DroppableCanvas;