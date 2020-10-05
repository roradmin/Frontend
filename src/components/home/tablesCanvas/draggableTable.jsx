import React,{useContext} from 'react'
import { useDrag } from 'react-dnd'
import { TablesAreaContext } from '../tablesArea/tablesArea';
import TableTemplate from '../../common/tableTemplate/tableTemplate';

const DraggableTable = ({
  tblProprties,
  existsTable,
  templateRef = null
}) => {  
  //const {areaBounds} = useContext(TablesAreaContext);
  const [{isDragging}, drag] = useDrag({
    item: {
      type: 'table',
      existsTable,
      tableInfo:{
        currentOrder: tblProprties.currentOrder || null,
        tableName: tblProprties.tableName || null,
        diners: tblProprties.diners,
        location: tblProprties.location,
        dinersAmount: Object.keys(tblProprties.diners).reduce((sum,current) => sum += tblProprties.diners[current],0),
        templateRef
      }
    },
    end: (item, monitor) => onDraggingEnd(item,monitor),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const onDraggingEnd = (item,monitor) => {
    if(monitor.isDragging() && existsTable){
      // need to got name and add table to list
    }
  }
  if (isDragging && !existsTable) {
    return <div ref = {drag} className = "canvasTableItem onDrag"/>
  }
   //React.useMemo(() =>
   return <div 
        ref = {drag}
        style = {tblProprties.location && {left: tblProprties.location.x, top: tblProprties.location.y}}
        className = {'canvasTableItem'}
      >
       <TableTemplate
          seats = {tblProprties.diners}
          tableName = {tblProprties.tableName}
          existsTable = {existsTable}
        /> 
    </div>
    //,[tblProprties]);
}
export default DraggableTable


// const [styledProps,setStyledProps] = useState({});
// const prevSeatsValue = usePrevious(seats);
// const {areaBounds} = useContext(TablesAreaContext);
// const [parentWidth,setParentWidth] = useState(null);
// const [parentHeight,setParentHeight] = useState(null);

// React.useEffect(() => console.log('2-------------------'));

// React.useEffect(() => {
//     const _width = _.get(areaBounds,['width'],null) / 130;
//     const _height = _.get(areaBounds,['height'],null) / 75;
//     setParentWidth(_width);
//     setParentHeight(_height);
//     console.log(areaBounds);
// },[areaBounds]);