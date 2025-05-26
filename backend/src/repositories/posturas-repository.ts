import type { PosturaModel } from "../models/posturas-model";
import fs from "fs";
import path from "path";

const posturasFilePath = path.resolve(__dirname, "../data/posturas.json");
export const database: PosturaModel[] = JSON.parse(
  fs.readFileSync(posturasFilePath, "utf-8")
);

const saveDatabase = () => {
  fs.writeFileSync(posturasFilePath, JSON.stringify(database, null, 2), "utf-8");
};

export const getPosturas = async (): Promise<PosturaModel[]> => {
  // console.log(database);
  return database;
};

export const findPosturaById = async (
  id: number
): Promise<PosturaModel | null> => {
  return database.find((postura) => postura.id === id) || null;
};

export const insertPostura = async (
  postura: PosturaModel
): Promise<PosturaModel> => {
  database.push(postura);
  saveDatabase();
  return postura;
};

export const deletePosturaById = async (id: number) => {
  const index = database.findIndex((postura) => postura.id === id);

  if (index === -1) {
    return null;
  } else {
    database.splice(index, 1);
    saveDatabase();
  }
};

export const updatePosturaById = async (
  id: number,
  info: Partial<PosturaModel>
) => {
  const index = database.findIndex((postura) => postura.id === id);

  if (index === -1) {
    return null;
  } else {
    database[index] = {
      ...database[index],
      ...info,
    };
    saveDatabase();
  }
};

export const getFullKati = async (kati: string) => {
  return database.filter((postura) => postura.kati === kati);
}