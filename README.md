# API Kung Fu

An interactive catalog of Kung Fu stances (*posturas*), organized by belt (*faixa*) and form (*kati*). Pick a belt, browse the stances of each form, and see each one as an image and an animated loop.

The project has two parts: a REST API in Node.js and TypeScript, and a React frontend that consumes it. The frontend is deployed to GitHub Pages through GitHub Actions.

> Content status: the structure covers 3 belts and 3 forms (30 stances). Final descriptions, photos and full-form videos are being added; placeholders are used where they are still missing.

## Features

- Browse stances by belt, with pagination
- Image and animated loop for each stance
- Full-form video page per belt (`/video/:faixa`)
- REST API with full CRUD and filtering by belt and form
- Asset pipeline that converts source images and GIFs to optimized WebP

## Tech stack

**Backend:** Node.js, TypeScript, Express 5, tsx, tsup, `node:test`
**Frontend:** React 19, TypeScript, React Router, Axios, Sass (CSS Modules)
**Tooling:** GitHub Actions, GitHub Pages, `cwebp` / `gif2webp`

## Project structure

```
api/
├── backend/
│   ├── data/posturas.json        # JSON file used as the data store
│   └── src/
│       ├── routes/               # route definitions
│       ├── controllers/          # HTTP layer: parse request, send response
│       ├── services/             # validation and business rules
│       ├── repositories/         # data access (read/write the JSON file)
│       ├── models/               # TypeScript types
│       ├── utils/http-helper.ts  # standard HTTP responses
│       └── posturas.test.ts      # integration tests
└── frontend/
    ├── assets-src/               # original images and GIFs
    ├── public/assets/            # optimized WebP output
    ├── scripts/optimize-assets.sh
    └── src/
        ├── pages/
        ├── components/
        ├── services/             # API client
        └── styles/               # Sass partials (variables, mixins, typography...)
```

The backend follows a layered structure (routes, controllers, services, repositories), so each layer has one job and the data store could be swapped for a real database by changing only the repository.

## API

Base URL: `http://localhost:3333/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/posturas` | List stances. Optional filters: `?faixa=` and `?kati=` |
| GET | `/posturas/:id` | Get one stance |
| POST | `/posturas` | Create a stance |
| PATCH | `/posturas/:id` | Update fields of a stance |
| DELETE | `/posturas/:id` | Delete a stance |

Responses: `200`, `201`, `204`, `400` for invalid ids or bodies, `404` when the stance does not exist.

**Stance model**

```json
{
  "id": 1,
  "nome": "Postura primeira",
  "faixa": "Amarela",
  "kati": "SUP JU KUEN",
  "nomekatiportugues": "Kati das Quatro Direções",
  "descricao": "...",
  "imagem": "/assets/images/sup-ju-kuen-postura-01.webp",
  "gif": "/assets/gifs/sup-ju-kuen-postura-01.webp"
}
```

The service layer only accepts known fields, so a client cannot set the `id` or inject unexpected keys. All fields except `gif` are required on creation.

## Running locally

Requirements: Node.js 22.

**Backend**

```bash
cd api/backend
cp .env.example .env
npm install
npm run start:dev       # http://localhost:3333
```

**Frontend**

```bash
cd api/frontend
cp .env.example .env
npm install
npm start               # http://localhost:3000
```

## Tests

```bash
cd api/backend
npm test
```

The tests start the real Express app on a random port and exercise every endpoint over HTTP: listing and filtering, `400` and `404` cases, body validation and id generation. They run against a temporary copy of the data file, so the real data is never touched.

## Deployment

Every push to `main` runs a GitHub Actions workflow that builds the frontend and publishes it to GitHub Pages. Since Pages only serves static files, the build points the frontend at a static copy of `posturas.json` instead of the API, and copies `index.html` to `404.html` so client-side routes survive a page reload.

## Optimizing assets

Source images and GIFs go in `api/frontend/assets-src/`. To convert them to WebP (images resized to 1280px wide):

```bash
brew install webp
cd api/frontend
npm run assets
```

Files that are already converted and up to date are skipped.

## Author

**Maria Cesarotti** · Software developer · [GitHub](https://github.com/mariacesarotti)
