import { Request, Response } from "express";
import * as PosturasServices from "../services/posturas-service";
import { badRequest } from "../utils/http-helper";
import type { HttpResponse } from "../models/http-response-model";

const send = (res: Response, httpResponse: HttpResponse) => {
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

// runs the handler only when :id is an integer, 400 otherwise
const withId =
  (handler: (id: number, req: Request) => Promise<HttpResponse>) =>
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    send(res, Number.isInteger(id) ? await handler(id, req) : badRequest());
  };

const queryString = (value: unknown) =>
  typeof value === "string" ? value : undefined;

export const getPostura = async (req: Request, res: Response) => {
  const httpResponse = await PosturasServices.getPosturaService({
    faixa: queryString(req.query.faixa),
    kati: queryString(req.query.kati),
  });

  res.set("Cache-Control", "public, max-age=60");
  send(res, httpResponse);
};

export const getPosturaById = withId((id) =>
  PosturasServices.getPosturaByIdService(id)
);

export const createPostura = async (req: Request, res: Response) => {
  send(res, await PosturasServices.createPosturaService(req.body));
};

export const deletePosturaById = withId((id) =>
  PosturasServices.deletePosturaByIdService(id)
);

export const updatePosturaById = withId((id, req) =>
  PosturasServices.updatePosturasByIdService(id, req.body)
);
