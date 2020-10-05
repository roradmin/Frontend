import {ApiInstance} from './api';
const axiosInstance = ApiInstance();
const tableTemplatesPath = '/v1/tableTemplates';
const tablePath = '/v1/tables';

export const getTablesTemplates = () => {
    return axiosInstance.get(tableTemplatesPath);
}

export const insertNewTableTemplate = (data) => {
    console.log(data);
    return axiosInstance.post(tableTemplatesPath,data);
}
export const addNewTable = (data) => {
    return axiosInstance.post(tablePath,data);
}
export const getAllTables = () => {
    return axiosInstance.get(tablePath);
}
