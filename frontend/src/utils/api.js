import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9280/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAccount = async () => {
  const response = await api.get('/user/getAccount');
  return response.data;
};

export const searchAccount = async (steamId) => {
  const response = await api.get('/user/searchAccount', {
    params: { steam_id: steamId }
  });
  return response.data;
};

export const bindAccount = async (accountData) => {
  const response = await api.post('/user/bindAccount', accountData);
  return response.data;
};
