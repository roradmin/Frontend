import React,{useState} from 'react';
import styled from 'styled-components';
import MainPageItem from './mainPageItem';
import FiltersRow from './filtersRow';
import ItemDetails from './itemDetails';
import TopBox from '../../dashboard/topBox';

const MainPageList = ({list,type,onRowClicked}) => {
    const [currentItem,setCurrentItem] = useState(null);
    const [filterList,setFilterList] = useState(list);

    return React.useMemo(() => <StyledProvList>
        <FiltersRow
            fullList = {list}
            type = {type}
            filteredList = {filterList}
            setFilteredList = {setFilterList}
        />
        <ItemDetails currentItem = {currentItem} type = {type}/>
        <ul>
            {
                filterList.map(
                    (item,idx) => <MainPageItem
                        item = {item}
                        place = {idx}
                        key = {item.id}
                        setCurrentItem = {setCurrentItem}
                        onRowClicked = {onRowClicked}
                        isActiveItem = {item.id == currentItem?.id || false}
                />)
            }
        </ul>
        <div className="LastActions">
            <h3 style={{ color:'#fff'}}>Last Actions</h3>
            <div className="listHolder"  id="basicScroller">
                {[1,2,3,4,5,6,7,8,9].map(t => <TopBox key = {t} backgroundColor='#eee'>{t}</TopBox>)}
            </div>
        </div>
    </StyledProvList>,[filterList,currentItem]);
}

const StyledProvList = styled.div`
    height:100%;
    display: grid;
    grid-template-areas:
        "actions filters details"
        "actions list details";
    grid-template-rows: 70px 1fr;
    grid-template-columns: 210px 1fr 250px;
    max-height: 70vh;
    .LastActions{
        grid-area: actions;
        display: grid;
        grid-template-rows: auto 1fr;
        .listHolder{
            max-height: inherit;
            overflow: auto;
            direction: rtl;
            display: grid;
            justify-content: center;
        }
    }
    ul{
        grid-area: list;
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        width: 100%;
        background: #ccc;
        text-align: center;
        margin: 0;
        padding: 0;
        height: 100%;   
        max-height: inherit;
        overflow-y: auto;
    }
    @media only screen and (max-width: 1400px) {
        ul{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`;
;
export default MainPageList;