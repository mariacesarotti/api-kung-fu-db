"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/repositories/posturas-repository.ts
var posturas_repository_exports = {};
__export(posturas_repository_exports, {
  database: () => database,
  deletePosturaById: () => deletePosturaById,
  findPosturaById: () => findPosturaById,
  getFullKati: () => getFullKati,
  getPosturas: () => getPosturas,
  insertPostura: () => insertPostura,
  updatePosturaById: () => updatePosturaById
});
module.exports = __toCommonJS(posturas_repository_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var posturasFilePath = import_path.default.resolve(__dirname, "../data/posturas.json");
var database = JSON.parse(
  import_fs.default.readFileSync(posturasFilePath, "utf-8")
);
var saveDatabase = () => {
  import_fs.default.writeFileSync(posturasFilePath, JSON.stringify(database, null, 2), "utf-8");
};
var getPosturas = () => __async(void 0, null, function* () {
  return database;
});
var findPosturaById = (id) => __async(void 0, null, function* () {
  return database.find((postura) => postura.id === id) || null;
});
var insertPostura = (postura) => __async(void 0, null, function* () {
  database.push(postura);
  saveDatabase();
  return postura;
});
var deletePosturaById = (id) => __async(void 0, null, function* () {
  const index = database.findIndex((postura) => postura.id === id);
  if (index === -1) {
    return null;
  } else {
    database.splice(index, 1);
    saveDatabase();
  }
});
var updatePosturaById = (id, info) => __async(void 0, null, function* () {
  const index = database.findIndex((postura) => postura.id === id);
  if (index === -1) {
    return null;
  } else {
    database[index] = __spreadValues(__spreadValues({}, database[index]), info);
    saveDatabase();
  }
});
var getFullKati = (kati) => __async(void 0, null, function* () {
  return database.filter((postura) => postura.kati === kati);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  database,
  deletePosturaById,
  findPosturaById,
  getFullKati,
  getPosturas,
  insertPostura,
  updatePosturaById
});
