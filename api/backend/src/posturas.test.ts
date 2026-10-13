import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import fs from "node:fs";
import type { AddressInfo, Server } from "node:net";
import os from "node:os";
import path from "node:path";

// work on a copy so the tests never touch data/posturas.json
const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "posturas-")), "posturas.json");
fs.copyFileSync("data/posturas.json", file);
process.env.POSTURAS_FILE = file;

let server: Server;
let api: string;

const request = (url: string, method = "GET", body?: unknown) =>
  fetch(api + url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

before(async () => {
  const { default: createApp } = await import("./app");
  server = createApp().listen(0);
  await once(server, "listening");
  api = `http://localhost:${(server.address() as AddressInfo).port}/api`;
});

after(() => {
  (server as any).closeAllConnections();
  server.close();
});

test("lists and filters posturas", async () => {
  const all = await (await request("/posturas")).json();
  assert.ok(all.length > 0);

  const { faixa, kati } = all[0];
  const filtered = await (
    await request(`/posturas?faixa=${encodeURIComponent(faixa)}&kati=${encodeURIComponent(kati)}`)
  ).json();
  assert.ok(filtered.length > 0);
  assert.ok(filtered.every((p: any) => p.faixa === faixa && p.kati === kati));

  assert.deepEqual(await (await request("/posturas?kati=nao-existe")).json(), []);
});

test("404 for unknown id, 400 for invalid id", async () => {
  assert.equal((await request("/posturas/999999")).status, 404);
  assert.equal((await request("/posturas/abc")).status, 400);
  assert.equal((await request("/posturas/999999", "DELETE")).status, 404);
  assert.equal((await request("/posturas/999999", "PATCH", { nome: "x" })).status, 404);
});

test("create validates the body and generates the id", async () => {
  assert.equal((await request("/posturas", "POST", {})).status, 400);
  assert.equal((await request("/posturas", "POST", { nome: "só nome" })).status, 400);

  const all = await (await request("/posturas")).json();
  const response = await request("/posturas", "POST", {
    id: 1,
    nome: "Nova",
    faixa: "Amarela",
    kati: "SUP JU KUEN",
    nomekatiportugues: "Kati",
    descricao: "desc",
    imagem: "/assets/images/x.webp",
  });
  assert.equal(response.status, 201);
  const created = await response.json();
  assert.equal(created.id, Math.max(...all.map((p: any) => p.id)) + 1);

  assert.equal((await request(`/posturas/${created.id}`, "DELETE")).status, 204);
  assert.equal((await request(`/posturas/${created.id}`)).status, 404);
});

test("patch returns the updated postura and ignores id", async () => {
  const response = await request("/posturas/1", "PATCH", { nome: "Atualizada", id: 50 });
  assert.equal(response.status, 200);
  const updated = await response.json();
  assert.equal(updated.nome, "Atualizada");
  assert.equal(updated.id, 1);

  assert.equal((await request("/posturas/1", "PATCH", { desconhecido: "x" })).status, 400);
});

test("malformed JSON is a 400", async () => {
  const response = await fetch(api + "/posturas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal(response.status, 400);
});
