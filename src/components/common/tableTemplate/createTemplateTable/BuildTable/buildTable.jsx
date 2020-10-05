import React,{useState,useMemo,useEffect} from 'react';
import TableTemplateBase from '../../tableTemplateBase';
import './buildTable.scss';

const BuildTable = ({
    tableName,
    updateBackward = null
}) => {
    const [inputs,setInputs] = useState({ 
        top: 0,      //width
        right: 0,    //height
        bottom: 0,   //width
        left: 0      //height
    });
    const [recHeight,setHeight] = useState(0);
    const [recWidth,setWidth] =  useState(0);
    const [tableSize,setTableSize] = useState(0);

    useEffect(() => {
        const currentSize = Object.keys(inputs).map(pt => inputs[pt]).reduce((total,cur) => total += cur,0);
        setTableSize(currentSize);
    },[inputs]);

    const changeValue = ({key,val,direction}) => {
        if(val >= 0){
            const combined = {...inputs,[key]: val};
            setInputs(combined);      
                if (key === 'left' || key === 'right'){
                    if(direction === 'up' && val > recHeight || direction === 'down' && val < recHeight){
                        console.log(key,val,direction);
                        setHeight(val);
                    }
                }else if (key === 'bottom' || key === 'top'){
                    if(direction === 'up' && val > recWidth || direction === 'down' && val < recWidth){
                        console.log(key,val,direction);
                        setWidth(val);
                    }
                }
            if(updateBackward != null){
                //console.log(combined);
                updateBackward({diners: combined,name: tableName})
            }
        }
    }
    const generateInputs = () => {
        return Object.keys(inputs)
        .map(inp => (
            <div key = {inp} className={"inputholder "+ inp} >
                <div className="inputWrapper">
                    <span onClick = {() =>  changeValue({key:inp, val: inputs[inp] - 1,direction: 'down'})}>-</span>   
                    <input
                        step = "1"
                        value = {inputs[inp]}
                        name = {inp}
                        type = 'number'
                        readOnly
                    />
                    <span onClick = {() =>  changeValue({key:inp, val: inputs[inp] + 1,direction: 'up'})}>+</span>
                </div>
            </div>
        ));
      }
    return useMemo(() => <div className='styledArea'>
        <h2>Set Table Seats</h2>  
        <h2 className="tableName">{tableName}</h2>
        {generateInputs()}
        <TableTemplateBase
            cstmStyle = {{            
                width: recWidth * 1.5 + 'vw',
                height: recHeight * 2 + 'vh',    
                minWidth: '8vw',
                minHeight: '12vh',
                maxHeight: '30vh',
                maxWidth: '30vw'
            }}
            tableLabel = {tableSize}
            seats = {inputs}
        />
    </div>,[inputs,tableSize]);
}

export default BuildTable;
