import {ApiInstance} from './api';
import envConfig from '../config';
const {ingredientUrl,providersUrl,ordersUrl,providerExternal} = envConfig();
const axiosInstance = ApiInstance();

export const getAllProviders = () => axiosInstance.get(providersUrl);
export const getProviderData = (providerId) => axiosInstance.get(`${providersUrl}/${providerId}`);
export const getProviderIngredient = (providerId) => axiosInstance.get(`${ingredientUrl}/provider/${providerId}`);
export const updateCurrentProvider = (providerId,data) => axiosInstance.put(`${providersUrl}/${providerId}` , data);

export const getMiniStatsForProvider = ({
    providerId,
    query,
    
}) => {
    return axiosInstance.get(`${ordersUrl}/provider/${providerId}?${query}&stats=true`);
}
export const getFilteredExternalProviders = (filter) => axiosInstance.get(`${providerExternal}?includes=${filter}`);
export const createNewProvider = (providerData) => axiosInstance.post(providersUrl,providerData);

export const deleteProviderContact = async (contactId) => {
    try{
        const res = await axiosInstance.delete(`${providersUrl}/contact/${contactId}`);
        return res.data?.data;
    }
    catch(err){
        console.error(err);
        return false;
    }
}
export const deleteProviderSchedule = async (scheduleId) => {
    try{
        const res = await axiosInstance.delete(`${providersUrl}/schedule/${scheduleId}`);
        return true;
    }
    catch(err){
        console.error(err);
        return false;
    }
}
