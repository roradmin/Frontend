import React,{useState,useContext,useEffect} from 'react';
import TablesOptions from '../templatesOptions/tablesOptions';
import AppContext from '../../appContext';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import DroppableCanvas from '../tablesCanvas/droppableCanvas';
import getResponsiveDetails from '../../common/mediaQuery/mediaQuery';
import {getCombinedTblsWithTemplates,getTemplates} from './canvasHelper';
import TablesList from './TablesList';
import AskForName from '../tablesCanvas/askForName';
import _ from 'lodash';
import './tablesArea.scss';

export const TablesAreaContext = React.createContext();

const TablesArea = () => {
  const {setLoading,openPopupMessage} = useContext(AppContext);
  const [tablesTemplates,setTablesTemplates] = useState([]);
  const [tablesList,setTablesList] = useState([]);
  const {isDesktopOrLaptop} = getResponsiveDetails();
  const [areaBounds,setAreaBounds] = useState({height: null,width: null});
  const [newTable,setNewTable] = useState({});

  useEffect(() => {loadLists()},[]);
  useEffect(() => console.log(tablesList),[tablesList]);
  useEffect(() => console.log(areaBounds),[areaBounds]);
  
  const loadLists = async() => {
      setLoading(true);
      try{
        const lists = await getCombinedTblsWithTemplates();
        const {tmplsList,tblsTmplsList} = lists;
        !_.isEmpty(tmplsList) && setTablesTemplates(tmplsList);
        !_.isEmpty(tblsTmplsList) && setTablesList(tblsTmplsList);
      }
      catch(err){
        openPopupMessage({err});
      }
      finally{
        setLoading(false);
      }
  }
  const loadTemplates = async() => {
    const templates = await getTemplates().catch(err =>  openPopupMessage({err}));
    setTablesTemplates(templates)
  }
  const onCurrent = () => {
    // need to save current session of tables order
  }
  const setTblNumber = async(inserted) => {
    if(inserted){
      const findName = tablesList.find(tbl => tbl.tableName == inserted);
      if(findName){
        openPopupMessage({header: 'Table number already exists',type:'warning'});
      }else{
        console.log(tablesList);
        const newTbl = {...newTable,tableName: inserted}
        setTablesList([...tablesList,newTbl]);
        setNewTable({});
      }
      //const {data} = await addNewTable(newTbl).catch(err => openPopupMessage({err}));
      //console.log(data);
    }  
  }
  const HandleNewTblName = () => {
    if (_.isEmpty(newTable) || newTable.name) return [];
    return <AskForName callback = {setTblNumber} label = 'Table Number...' />
  }
  return (
    <div className='TablesAreaWrapper'>
      <TablesAreaContext.Provider
        value = {{
          tablesList: tablesList,
          setTablesList: setTablesList,
          loadLists:loadLists,
          tablesTemplates: tablesTemplates,
          setTablesTemplates: setTablesTemplates,
          setNewTable: setNewTable,
          areaBounds: areaBounds,
          loadTemplates: loadTemplates,
          setAreaBounds: setAreaBounds
        }}>
          {
            isDesktopOrLaptop && <DndProvider backend={Backend}>
                <DroppableCanvas />
                <TablesOptions />    
            </DndProvider> || <TablesList />
          }
          <HandleNewTblName />
      </TablesAreaContext.Provider>
    </div>
  )
}
 
export default TablesArea;
 