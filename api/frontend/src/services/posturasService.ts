import { PosturaModel } from '../types/posturaTypes';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333/api";

export const getPosturas = async (): Promise<PosturaModel[]> => {
  const response = await axios.get(`${API_URL}/posturas`);
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
