import React,{useState,useEffect,useContext} from 'react';
import Select from 'react-select';
import { getCatagoriesOptions } from '../../../apiConnector/dishes.api';
import AppContext from '../../appContext';
import _ from 'lodash';

const CategorySelect = ({category,onChange}) => {
    const [categoryOptions,setCategoryOptions] = useState([]);
    const [currentCategory,setCurrentCategory] = useState(null);
    const {openPopupMessage} = useContext(AppContext);

    useEffect(() => { 
        _.isEmpty(categoryOptions) && loadCatagoriesList();
    },[]);
    
    useEffect(() => {
        currentCategory && onChange({id:currentCategory.value,name:currentCategory.label});
    },[currentCategory]);

    const loadCatagoriesList = async() => {
        try{
            const catList = await getCatagoriesOptions();
            const selectOptions = catList.data.data.map(car => ({value:car.id,label:car.name}));
            setCategoryOptions(selectOptions);
        }
        catch(err){
            openPopupMessage({err});
        }
    }

    return _.isEmpty(categoryOptions)?[]:<Select
        onChange={(val) => setCurrentCategory(val)}
        value = {currentCategory}
        options={categoryOptions}
        placeholder = 'Select Category...'
    />
}

export default CategorySelect;