import { Request, Response } from "express";
import * as PosturasServices from "../services/posturas-service";
import { badRequest } from "../utils/http-helper";
import type { PosturaModel } from "../models/posturas-model";

export const getPostura = async (req: Request, res: Response) => {
  const httpResponse = await PosturasServices.getPosturaService();
  
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getPosturaById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const httpResponse = await PosturasServices.getPosturaByIdService(id);

  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const createPostura = async (req: Request, res: Response) => {
  const postura = req.body;
  const httpResponse = await PosturasServices.createPosturaService(postura);

  if (httpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    const response = await badRequest();
    res.status(response.statusCode).json(response.body);
  }
};

export const deletePosturaById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const httpResponse = await PosturasServices.deletePosturaByIdService(id);

  if (httpResponse) {
    res.status(200).json(httpResponse);
  } else {
    const response = await badRequest();
    res.status(response.statusCode).json(response.body);
  }
};

export const updatePosturaById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const bodyValues: Partial<PosturaModel> = req.body;
  const httpResponse = await PosturasServices.updatePosturasByIdService(
    id,
    bodyValues
  );

  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getFullKati = async (req: Request, res: Response) => {
  const kati = req.params.kati;
  const httpResponse = await PosturasServices.getFullKatiService(kati);

  res.status(httpResponse.statusCode).json(httpResponse.body);
}