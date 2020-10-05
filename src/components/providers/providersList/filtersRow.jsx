import React,{useState} from 'react';
import styled from 'styled-components';
import SearchInput from '../../common/inputs/searchInput';
import { CustomSelect } from '../../common/selectComponents/customSelect';
import { FaSortAlphaDown,FaSortAlphaUp } from "react-icons/fa";
import { StyledButton } from '../../common/forms/styledButton';
import { useHistory } from 'react-router-dom';

const FiltersRow = ({
    type,
    fullList,
    filteredList,
    setFilteredList
}) => {
    const activeOptions =  [{label: 'All',value:'All'},{label: 'Active',value:true},{label: 'Disabled',value: false}];
    const [activeFlag,setActiveFlag] = useState(activeOptions[0]);
    const [inputFilterText,setInputFilterText] = useState('');
    const [currentSort,setCurrentSort] = useState('ZA');
    let history = useHistory();

    React.useEffect(() => {
        setFilteredList(fullList.filter(li => activeFlag.value === 'All' || li.isActive === activeFlag.value));
    },[activeFlag]);

    React.useEffect(() => {
        const filtered = fullList.filter(li => li.name.toLowerCase().includes(inputFilterText.toLowerCase()))
        setFilteredList(filtered);
    },[inputFilterText]);
    
    const sortList = (up = false) => {
        const unsortedList = [...filteredList];
        unsortedList.sort((a, b) => {
            if(a.name < b.name) { return up ? -1 : 1;}
            if(a.name > b.name) { return up ? 1 : -1; }
            return 0;
        })
        setCurrentSort(up ? 'AZ' : 'ZA');
        setFilteredList(unsortedList);
    }
    const handleCreation = () => {
        switch(type){
            case 'provider':
                history.push('/Providers/providerCreation');
                break;
            case 'ingredient':
                history.push('/ingredients/IngredientCreation');
                break;
            default: return null;
        }
    }
    return <StyledFilters>
        <div>
            <SearchInput
                time = {600}
                value = {inputFilterText}
                onChange = {setInputFilterText}
            />
            <CustomSelect 
                options = {activeOptions}
                onChange = {setActiveFlag}
                currentValue = {activeFlag}
            />
            {currentSort === 'ZA' ? <FaSortAlphaUp onClick = {() => sortList(true)}/> : <FaSortAlphaDown onClick = {()=> sortList()} />}
            <StyledButton
                onClick={() => handleCreation()}
                title={'Create ' + type}
                width='200px'
                position ='absolute'
            />
        </div>
    </StyledFilters>
}

const StyledFilters = styled.div`
    width:100%;
    background:#333;
    grid-area: filters;
    display: grid;
    >div{
        width:100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-self: center;
        position:relative;

    }
    svg{
        color:#fff;
        font-size: 20px;
        cursor:pointer;

    }
`;
;
export default FiltersRow;