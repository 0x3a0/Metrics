import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9280/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAccount = async () => {
  try {
    const response = await api.get('/user/getAccount');
    return response.data;
  } catch (error) {
    // 如果后端返回了错误响应，返回错误数据
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // 其他错误（网络错误等）重新抛出
    throw error;
  }
};

export const searchAccount = async (steamId) => {
  try {
    const response = await api.get('/user/searchAccount', {
      params: { steam_id: steamId }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    // 如果后端返回了错误响应，返回错误数据
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // 其他错误（网络错误等）重新抛出
    throw error;
  }
};

export const bindAccount = async (accountData) => {
  try {
    const response = await api.post('/user/bindAccount', accountData);
    return response.data;
  } catch (error) {
    // 如果后端返回了错误响应（如400），返回错误数据
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // 其他错误（网络错误等）重新抛出
    throw error;
  }
};

export const deleteAccount = async (steamId) => {
  try {
    const response = await api.post('/user/deleteAccount', { steam_id: steamId });
    return response.data;
  } catch (error) {
    // 如果后端返回了错误响应（如404），返回错误数据
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // 其他错误（网络错误等）重新抛出
    throw error;
  }
};

export const getInventoryHistory = async (steamId) => {
  try {
    const response = await api.get('/inventory/history', {
      params: { steamId }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};
