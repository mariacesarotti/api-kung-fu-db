import { PosturaModel } from '../types/posturaTypes';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333/api";

// on GitHub Pages there is no API: the deploy build points this at a static copy of posturas.json
const POSTURAS_URL = process.env.REACT_APP_POSTURAS_URL || `${API_URL}/posturas`;

export const getPosturas = async (): Promise<PosturaModel[]> => {
  const response = await axios.get(POSTURAS_URL);
  return response.data;
};

export const updatePostura = async (
  id: number,
  updatedFields: Partial<PosturaModel>
) => {
  const response = await axios.patch(
    `${API_URL}/posturas/${id}`,
    updatedFields
  );
  return response.data;
};

export const deletePostura = async (id: number) => {
  const response = await axios.delete(`${API_URL}/posturas/${id}`);
  return response.data;
};

export const createPostura = async (newPostura: Omit<PosturaModel, 'id'>) => {
  const response = await axios.post(`${API_URL}/posturas`, newPostura);
  return response.data;
};
