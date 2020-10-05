import { ApiInstance } from './api';
const avatarInstance = ApiInstance('multipart/form-data');
const FormData = require('form-data');

export const postProviderAvatar = async (img, providerId, providerExternalId) => {
  console.log('img :', img);
  if (providerId) {
    try {
      let data = new FormData();
      data.append("avatar", img);
      const url = `/v1/avatars?id=${providerId}${providerExternalId ? `&externalId=${providerExternalId}` : ''}&type=1`;
      const uploadRes = await avatarInstance.post(url,data);
      return uploadRes?.data;
    }
    catch (err) {
      console.error(err);
      return false;
    }
  } else return false;
}

export const postIngredientAvatar = async (img, ingId, ingExternalId) => {
  console.log('img :', img);
  if (ingId) {
    try {
      let data = new FormData();
      data.append("avatar", img);
      const url = ingExternalId ? `/v1/avatars?id=${ingId}&externalId=${ingExternalId}&type=2` :
        `/v1/avatars?id=${ingId}&type=2`;
      return await avatarInstance.post(
        url,
        data
      );
    }
    catch (err) {
      console.error(err);
    }
  } else return false;
}