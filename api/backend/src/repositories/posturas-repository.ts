import type { PosturaFilter, PosturaModel } from "../models/posturas-model";
import fs from "fs";
import path from "path";

// resolved from cwd so it works the same from src (tsx) and from dist
const posturasFilePath =
  process.env.POSTURAS_FILE || path.resolve(process.cwd(), "data/posturas.json");
export const database: PosturaModel[] = JSON.parse(
  fs.readFileSync(posturasFilePath, "utf-8")
);

const saveDatabase = () => {
  fs.writeFileSync(posturasFilePath, JSON.stringify(database, null, 2), "utf-8");
};

export const getPosturas = async ({
  faixa,
  kati,
}: PosturaFilter = {}): Promise<PosturaModel[]> => {
  return database.filter(
    (postura) =>
      (!faixa || postura.faixa === faixa) && (!kati || postura.kati === kati)
  );
};

export const findPosturaById = async (
  id: number
): Promise<PosturaModel | null> => {
  return database.find((postura) => postura.id === id) || null;
};

export const insertPostura = async (
  postura: Omit<PosturaModel, "id">
): Promise<PosturaModel> => {
  const id = Math.max(0, ...database.map((postura) => postura.id)) + 1;
  const created = { ...postura, id };
  database.push(created);
  saveDatabase();
  return created;
};

export const deletePosturaById = async (id: number): Promise<boolean> => {
  const index = database.findIndex((postura) => postura.id === id);

  if (index === -1) {
    return false;
  }
  database.splice(index, 1);
  saveDatabase();
  return true;
};

export const updatePosturaById = async (
  id: number,
  info: Partial<Omit<PosturaModel, "id">>
): Promise<PosturaModel | null> => {
  const index = database.findIndex((postura) => postura.id === id);

  if (index === -1) {
    return null;
  }
  database[index] = {
    ...database[index],
    ...info,
  };
  saveDatabase();
  return database[index];
};
