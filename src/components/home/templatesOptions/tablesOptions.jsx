import React,{useState,useEffect,useContext} from 'react';
import CreateShapePopup from '../../common/tableTemplate/createTemplateTable/createNewShape';
import DraggableTable from '../tablesCanvas/draggableTable';
import { TablesAreaContext } from '../tablesArea/tablesArea';
import {rotateTable} from '../tablesArea/canvasHelper';
import {getTemplates} from '../tablesArea/canvasHelper';
import './tablesOpts.scss';

const TablesOptions = () => {
const [creationFlag,setCreationFlag] = useState(false);
const {tablesTemplates,setTablesTemplates} = useContext(TablesAreaContext);

const rotateComponent = (data) => {
  const currentTemplatesList = [...tablesTemplates];
  const templateIdx = currentTemplatesList.findIndex(co => co.id == data.id);
  if(templateIdx != -1){
    const newTemplate = rotateTable({tbl:data});
    currentTemplatesList[templateIdx].diners = newTemplate;
    setTablesTemplates(currentTemplatesList);
  }
}
  return (
    <div className='TablesOptionsWrapper'>
        {creationFlag && <CreateShapePopup setOpenPopup = {setCreationFlag} reloadList = {getTemplates}/>}
        <h2 className="tablesSideHeader">TablesOptions</h2>
        <div className="btnsWrapper">
          <div className="circle" onClick={() => setCreationFlag(true)}>New</div>
        </div>
        <div className="templatesList" id = "basicScroller">
          {
            tablesTemplates.map((template,idx) => (
                <div className="templateHolder" key={template.name} onClick={() => rotateComponent(template)}>
                    <h4>{template.name}</h4>
                      <DraggableTable
                        tblProprties = {{
                          name: template.name,
                          diners: template.diners
                        }}
                        templateRef = {template.id}
                        existsTable = {false}
                        type = {'table'}
                        changeable = {false}
                      />
                </div>
            ))
          }
        </div>
    </div>
  )
}
//                          <TableTemplate seats = {template.diners} />

export default TablesOptions;