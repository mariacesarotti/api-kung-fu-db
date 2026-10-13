import type { PosturaFilter, PosturaModel } from "../models/posturas-model";
import * as PosturaRepository from "../repositories/posturas-repository";
import * as HttpResponse from "../utils/http-helper";

const fields = [
  "nome",
  "faixa",
  "kati",
  "nomekatiportugues",
  "descricao",
  "imagem",
  "gif",
] as const;
const requiredFields = fields.filter((field) => field !== "gif");

// keeps only the known string fields, so the client cannot set id or junk keys
const pickFields = (body: any): Partial<Omit<PosturaModel, "id">> =>
  Object.fromEntries(
    fields
      .filter((field) => typeof body?.[field] === "string")
      .map((field) => [field, body[field]])
  );

export const getPosturaService = async (filter: PosturaFilter) => {
  const data = await PosturaRepository.getPosturas(filter);
  return HttpResponse.ok(data);
};

export const getPosturaByIdService = async (id: number) => {
  const data = await PosturaRepository.findPosturaById(id);
  return data ? HttpResponse.ok(data) : HttpResponse.notFound();
};

export const createPosturaService = async (body: unknown) => {
  const postura = pickFields(body);
  if (requiredFields.some((field) => !postura[field])) {
    return HttpResponse.badRequest();
  }
  const data = await PosturaRepository.insertPostura(
    postura as Omit<PosturaModel, "id">
  );
  return HttpResponse.created(data);
};

export const deletePosturaByIdService = async (id: number) => {
  const deleted = await PosturaRepository.deletePosturaById(id);
  return deleted ? HttpResponse.noContent() : HttpResponse.notFound();
};

export const updatePosturasByIdService = async (id: number, body: unknown) => {
  const bodyValues = pickFields(body);
  if (Object.keys(bodyValues).length === 0) {
    return HttpResponse.badRequest();
  }
  const data = await PosturaRepository.updatePosturaById(id, bodyValues);
  return data ? HttpResponse.ok(data) : HttpResponse.notFound();
};
