import React,{useState,useContext} from 'react';
import BuildTable from './BuildTable/buildTable';
import { StyledButton } from '../../forms/styledButton';
import TextField from '../../inputs/textField';

import { insertNewTableTemplate } from '../../../../apiConnector/tables.api';
import AppContext from '../../../appContext';
import { TablesAreaContext } from '../../../home/tablesArea/tablesArea';

const CreateShapePopup = ({setOpenPopup}) => {
 const [page,setPage] = useState(0);
 const [tableName,setTableName] = useState('');
 const {openPopupMessage,setLoading} = useContext(AppContext);
 const {loadTemplates} = useContext(TablesAreaContext);
 const [styleProperties,setStyleProperties] = useState({});

 const createNewTableTemplate = async() => {
      console.log(styleProperties);
      const findEmptyTable = Object.keys(styleProperties).every(key => styleProperties[key] === 0);
      console.log('findEmptyTable ',findEmptyTable);
      if(findEmptyTable){
          openPopupMessage({header: 'Table cannot be empty!'});
      }else{
        setLoading(true);
        try{
          const newTemplate = await insertNewTableTemplate(styleProperties);
          console.log(newTemplate);
          openPopupMessage({msg: 'Table template created',type:'success'});
          loadTemplates();
          setOpenPopup(false);
        }catch(err){
          openPopupMessage({err});
        }
        finally{
            setLoading(false);
        }
      }
    }

  const Next = () => {
    const changePage = () => {
        if(page === 0){
            if(tableName.length > 0){
                setPage(page + 1);
            }else{
                openPopupMessage({header: 'Table name cannot be empty!'})
            }
        }else if(page === 1){
            createNewTableTemplate();
        }
    }
      return <div className="btnHolder"><StyledButton
            background = {'#990404'}
            backgroundHover = {'#a41c1c'}
            color = {'#eee'}
            valid = {tableName.length > 0 ? page === 0 : page === 1}
            onClick = {() => changePage()}
            title = {page === 0 ? 'Next' : 'Create'}
        /></div>
  }
  return (
    <div className='popupBackground'>
        <div className='popupDiv createShapeComponent'>
            <span className='closePopup' onClick = {() => setOpenPopup(false)}> X </span>
            {
                page === 0 ? <div className="nameHolder">
                  <TextField value={tableName} label={"Table Template Name..."} onChange={setTableName}/>
                </div> :
                <BuildTable
                  tableName={tableName}
                  updateBackward={(val) => setStyleProperties(val)}
                />
            }
            <Next />
        </div>
    </div>
  )
}
export default CreateShapePopup;
