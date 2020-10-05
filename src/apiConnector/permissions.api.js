import {ApiInstance} from './api';
const axiosInstance = ApiInstance();
const permissionsPath = '/v1/permissions';
const usersUrl = `/v1/users`;

export const getAllPermissions = () =>{
    return axiosInstance.get(permissionsPath)
}
export const updatePermissionsToUser = (userId,extraPermissions) => {
    return axiosInstance.put(`${usersUrl}/${userId}/permissions`,{extraPermissions:extraPermissions});
}

export const getUsers = () => {
    return axiosInstance.get(usersUrl);
}
