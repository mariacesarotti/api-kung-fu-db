import type { HttpResponse } from "../models/http-response-model";

export const ok = async (data: any): Promise<HttpResponse> => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const noContent = async (): Promise<HttpResponse> => {
  return {
    statusCode: 204,
    body: null,
  };
};

export const badRequest = async (): Promise<HttpResponse> => {
  return {
    statusCode: 400,
    body: null,
  };
};

export const created = async () => {
  return {
    statusCode: 201,
    body: "Created!",
  };
};

export function serverError(error: unknown) {
  throw new Error("Function not implemented.");
}
