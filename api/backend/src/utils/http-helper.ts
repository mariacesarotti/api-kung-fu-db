import type { HttpResponse } from "../models/http-response-model";

export const ok = (data: any): HttpResponse => ({ statusCode: 200, body: data });

export const created = (data: any): HttpResponse => ({ statusCode: 201, body: data });

export const noContent = (): HttpResponse => ({ statusCode: 204, body: null });

export const badRequest = (): HttpResponse => ({ statusCode: 400, body: null });

export const notFound = (): HttpResponse => ({ statusCode: 404, body: null });

export const serverError = (error: unknown): HttpResponse => {
  console.error(error);
  return { statusCode: 500, body: null };
};
