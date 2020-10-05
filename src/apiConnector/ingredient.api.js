import {ApiInstance} from './api';
import envConfig from '../config';
const axiosInstance = ApiInstance();
const {ingredientExternal} = envConfig();

const ingredientPath = '/v1/ingredients';

export const getAllIngredients = () => axiosInstance.get(ingredientPath);
export const getIngredientData = (ingId) => axiosInstance.get(`${ingredientPath}/${ingId}`);
export const createNewIngredient = (data) => axiosInstance.post(ingredientPath,data);
export const updateIngredient = (data,ingredientId) => axiosInstance.put(`${ingredientPath}/${ingredientId}`,data);
export const getFilteredExternalIngredients = (filter) => axiosInstance.get(`${ingredientExternal}?includes=${filter}`);