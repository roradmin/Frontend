import {ApiInstance} from './api';
const axiosInstance = ApiInstance();
const path = '/v1/auth';
const usersPath = '/v1/users';

export const register = (data) => {
    const registerData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password1
      }

    return axiosInstance.post(usersPath,registerData);
}
export const login = (data) => {
    return axiosInstance.post(path,data);
}
