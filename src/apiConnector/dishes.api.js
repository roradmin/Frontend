import {ApiInstance} from './api';
const axiosInstance = ApiInstance();
const dishesPath = '/v1/dishes';

export const getAllDishes = () => {
    return axiosInstance.get(dishesPath);
}

export const createNewDish = ({data}) => {
    console.log(data);
    return axiosInstance.post(dishesPath,data);
}

export const getCatagoriesOptions = () => {
    return axiosInstance.get(dishesPath + '/catagories');
}