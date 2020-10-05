import React,{useState,useContext,useEffect} from 'react';
import AppContext from '../appContext';
import {getCatagoriesOptions} from '../../apiConnector/dishes.api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee,faCheese,faCocktail,faHamburger,faSeedling} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import './menuPage.scss';

const getSpecificIcon = (section) => {
    switch (section){
        case 'breakfast':
            return <FontAwesomeIcon icon={faCoffee} />
        case 'main':
            return <FontAwesomeIcon icon={faHamburger} />
        case 'first':
            return <FontAwesomeIcon icon={faSeedling} />
        case 'dessert':
        case 'desert':
            return <FontAwesomeIcon icon={faCheese} />
        case 'drinks':
            return <FontAwesomeIcon icon={faCocktail} />
        default: return null;
    }
}

const Menu = ({onSelectSection}) => {
    const [categoryOptions,setCategoryOptions] = useState([]);
    const [selectedMenuSection,setSelectedMenuSection] = useState(null);
    const {openPopupMessage} = useContext(AppContext);

    useEffect(() => { 
        _.isEmpty(categoryOptions) && loadCatagoriesList();
    },[]);

    useEffect(() => {
        selectedMenuSection && onSelectSection(selectedMenuSection);
    },[selectedMenuSection]);

    const loadCatagoriesList = async() => {
        try{
            const catList = await getCatagoriesOptions();
            const selectOptions = catList.data.data.map(car => ({value:car.id,label:car.name}));
            setCategoryOptions(selectOptions);
        }
        catch(err){
            openPopupMessage({err,header:'Cannot load categoris list'});
        }
    }
    // TODO - > STORE THE Catagories INSIDE REDUX STORE
    return _.isEmpty(categoryOptions)?[]:<ul className="Menu">
        {
            categoryOptions.map(cat =>
            <li key={cat.label}
            onClick={() => setSelectedMenuSection(cat.label)}>
                {getSpecificIcon(cat.label)}
                {cat.label}
            </li>
            )
        }
    </ul>
}

export default Menu; 