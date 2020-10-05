import React from 'react';
import {
    FaAtlassian,FaHornbill,FaStumbleupon,
    FaUsers,FaFire,FaHashtag,FaHome,
    FaRegUser,FaTh} from "react-icons/fa";

export const routes = [{
    label: 'Home',
    icon: <FaHome />,
    childrens: null,
    link:'/'
},{
    label: 'Providers',
    icon: <FaAtlassian size="16"/>,
    childrens: [{
        label: 'Providers list',
        link:'/Providers'
    },{
        label: 'Create Provider',
        link:'/Providers/providerCreation'
    },{
        label: 'Providers Catalog',
        link:'/Providers/Catalog'
    }]
},{
    label: 'Ingredients',
    icon: <FaHornbill size="16"/>,
    childrens: [{
        label: 'Ingredients list',
        link:'/ingredients'
    },{
        label: 'Create Ingredient',
        link:'/ingredients/IngredientCreation'
    }]
},{
    label: 'Dishes',
    link:'/Dishes',
    icon: <FaFire />,
    childrens: null
},{
    label: 'Users',
    link:'/Users',
    icon: <FaUsers />,
    childrens: null
},{
    label: 'Statistics',
    link:'/Statistics',
    icon: <FaStumbleupon />,
    childrens: null
},{
    label: 'Tables',
    link:'/Tables',
    icon: <FaTh />,
    childrens: null
},{
    label: 'Permissions',
    link:'/permissions',
    icon: <FaRegUser />,
    childrens: null
},{
    label: 'Contact Us',
    link:'/ContactUs',
    icon: <FaHashtag />,
    childrens: null
}];

