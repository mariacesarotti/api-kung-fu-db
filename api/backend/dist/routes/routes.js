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

// src/routes/routes.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

// src/repositories/posturas-repository.ts
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

// src/utils/http-helper.ts
var ok = (data) => __async(void 0, null, function* () {
  return {
    statusCode: 200,
    body: data
  };
});
var noContent = () => __async(void 0, null, function* () {
  return {
    statusCode: 204,
    body: null
  };
});
var badRequest = () => __async(void 0, null, function* () {
  return {
    statusCode: 400,
    body: null
  };
});
var created = () => __async(void 0, null, function* () {
  return {
    statusCode: 201,
    body: "Created!"
  };
});

// src/services/posturas-service.ts
var getPosturaService = () => __async(void 0, null, function* () {
  const data = yield getPosturas();
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var getPosturaByIdService = (id) => __async(void 0, null, function* () {
  const data = yield findPosturaById(id);
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var createPosturaService = (postura) => __async(void 0, null, function* () {
  let response = null;
  if (Object.keys(postura).length > 0) {
    yield insertPostura(postura);
    response = yield created();
  } else {
    response = yield badRequest();
  }
  return response;
});
var deletePosturaByIdService = (id) => __async(void 0, null, function* () {
  const data = yield findPosturaById(id);
  let response = null;
  if (data) {
    yield deletePosturaById(id);
    response = "deletado!";
  } else {
    response = yield noContent();
  }
  return response;
});
var updatePosturasByIdService = (id, bodyValues) => __async(void 0, null, function* () {
  const data = yield updatePosturaById(id, bodyValues);
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var getFullKatiService = (kati) => __async(void 0, null, function* () {
  const data = yield getFullKati(kati);
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});

// src/controllers/posturas-controller.ts
var getPostura = (req, res) => __async(void 0, null, function* () {
  const httpResponse = yield getPosturaService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getPosturaById = (req, res) => __async(void 0, null, function* () {
  const id = parseInt(req.params.id);
  const httpResponse = yield getPosturaByIdService(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var createPostura = (req, res) => __async(void 0, null, function* () {
  const postura = req.body;
  const httpResponse = yield createPosturaService(postura);
  if (httpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    const response = yield badRequest();
    res.status(response.statusCode).json(response.body);
  }
});
var deletePosturaById2 = (req, res) => __async(void 0, null, function* () {
  const id = parseInt(req.params.id);
  const httpResponse = yield deletePosturaByIdService(id);
  if (httpResponse) {
    res.status(200).json(httpResponse);
  } else {
    const response = yield badRequest();
    res.status(response.statusCode).json(response.body);
  }
});
var updatePosturaById2 = (req, res) => __async(void 0, null, function* () {
  const id = parseInt(req.params.id);
  const bodyValues = req.body;
  const httpResponse = yield updatePosturasByIdService(
    id,
    bodyValues
  );
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getFullKati2 = (req, res) => __async(void 0, null, function* () {
  const kati = req.params.kati;
  const httpResponse = yield getFullKatiService(kati);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});

// src/routes/routes.ts
var router = (0, import_express.Router)();
router.get("/posturas", getPostura);
router.get("/posturas/:id", getPosturaById);
router.get("/posturas/:kati", getFullKati2);
router.post("/posturas", createPostura);
router.patch("/posturas/:id", updatePosturaById2);
router.delete("/posturas/:id", deletePosturaById2);
var routes_default = router;
