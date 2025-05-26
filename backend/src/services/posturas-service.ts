import type { PosturaModel } from "../models/posturas-model";
import * as PosturaRepository from "../repositories/posturas-repository";
import * as HttpResponse from "../utils/http-helper";
import fs from 'fs';
import path from 'path';

export const getPosturaService = async () => {
  const data = await PosturaRepository.getPosturas();

  let response = null;
  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const getPosturaByIdService = async (id: number) => {
  const data = await PosturaRepository.findPosturaById(id);

  let response = null;
  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const createPosturaService = async (postura: PosturaModel) => {
  let response = null;
  if (Object.keys(postura).length > 0) {
    await PosturaRepository.insertPostura(postura);
    response = await HttpResponse.created();
  } else {
    response = await HttpResponse.badRequest();
  }
  return response;
};

export const deletePosturaByIdService = async (id: number) => {
  const data = await PosturaRepository.findPosturaById(id);

  let response = null;

  if (data) {
    await PosturaRepository.deletePosturaById(id);
    response = "deletado!";
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const updatePosturasByIdService = async (
  id: number,
  bodyValues: Partial<PosturaModel>
) => {
  const data = await PosturaRepository.updatePosturaById(id, bodyValues);
  let response = null;
  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const getFullKatiService = async (kati: string) => {      
  const data = await PosturaRepository.getFullKati(kati);

  let response = null;
  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
}