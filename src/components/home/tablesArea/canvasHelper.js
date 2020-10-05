import {getTablesTemplates,getAllTables} from '../../../apiConnector/tables.api';

// get tables list and their templates from db
  export const getCombinedTblsWithTemplates = async() => {
    try{
      const TemplatesList = await getTablesTemplates();
      const TablesList = await getAllTables();
      console.log('receivedData template',TemplatesList.data.data, ' tables: ',TablesList.data.data);
      TablesList.data.data =  [{
        currentOrder: null,
        tableName: "12",
        location: {x:3,y:5},
        dinersAmount: 10,
        templateRef: "5e10d39529accd0017022398"
      },{
        currentOrder: null,
        tableName: "123",
        location: {x:7,y:12},
        dinersAmount: 10,
        templateRef: "5e106d2e533f2a0017c7dd50"
      }];
      const allDetails = TablesList.data.data.map(tbl => ({...tbl,...TemplatesList.data.data.find(tmpTbl => tmpTbl.id === tbl.templateRef)}));
      console.log(allDetails);
      return {
          tmplsList: TemplatesList.data.data,
          tblsTmplsList: allDetails
      }
    }
    catch(err){
      throw err;
      
    }
  }

  export const getTemplates = async() => {
    try{
      const TemplatesList = await getTablesTemplates();
      return TemplatesList.data.data;
    }
    catch(err){
      throw err;
    }
  }

  export const rotateTable = ({tbl}) => {
      const newTemplate = {
        top:    tbl.diners.left,
        left:   tbl.diners.bottom,
        bottom: tbl.diners.right,
        right:  tbl.diners.top
      }
      return newTemplate;
  }