import axios from 'axios';

const API_URL = 'https://api.disneyapi.dev/character';

export const fetchCharacters = async (page = 1, pageSize = 8) => {
  const response = await axios.get(API_URL, {
    params: { page, pageSize },
  });
  return response.data;
};

export const fetchCharacterById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
};

export const fetchCharactersByName = async (name: string) => {
  const response = await axios.get(API_URL, {
    params: { name },
  });
  return response.data;
};
