import { PosturaModel } from './../../../backend/src/models/posturas-model';
import axios from 'axios';

const API_URL = "http://localhost:3333/api"; // Change to your backend's URL

export const getPosturas = async (faixa?: string) => {
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
  const id = Math.floor(Math.random() * 1000);
  const response = await axios.post(`${API_URL}/posturas`, {...newPostura, id});
  return response.data;
};

