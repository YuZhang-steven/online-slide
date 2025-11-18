# Online Slide

A simple full-stack web application that lets users create presentations, manage pages, and edit content similar to PowerPoint

## Features Implemented

### Presentations

- List all presentations
- Create new presentation
- Delete presentation

### Pages

- List all pages
- Add and delete pages
- save pages online

### Content Editing

- Add text, images, or videos to a page
- Drag and move content anywhere within the page
- resize and rotate contents

## Getting Started

You can check the online deployed demo in Vercel:
[http://online-slide.vercel.app](http://online-slide.vercel.app)


### 1. Clone the Repository

```bash
#first
git clone https://github.com/YuZhang-steven/online-slide.git
#then
cd presentation-editor
```

### 2. Run the development server

```bash
# using npm
npm install
npm run dev

# using yarn
yarn install
yarn dev

# using pnpm
pnpm install
pnpm dev

# using bun
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Environment Variable

The project run on a online database with Cloudflare R2 as object storage for image and video store.
Create .env in /app:

```ini
BASE_URL=
POSTGRES_URL=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_ENDPOINT=
R2_PUBLIC_URL=
```


## Tech Stack

### Backend

Next.js API routes (or a separate server if applicable)
TypeScript – Shared domain types
Zod – Runtime validation + schema inference
Prisma – Type-safe ORM for database access
PostgreSQL – Primary database for persistence
Cloudflare R2 – Object storage for images/videos

### Frontend

Next.js – React framework for the SPA + routing
TypeScript – Strict typing across the app
Zustand – Lightweight global state management
Konva / react-konva – Canvas-based presentation editor (drag/move/resize content)
use-image – Image loading helper for Konva
TailwindCSS – Utility-first styling
Shadcn/UI – Reusable, accessible UI components

## Project Structure

### Basic Folder Structures

```text
app/                # Next.js App Router pages & API routes
action/             # Server Actions for data fetching or API call
components/         # Reusable UI components (Shadcn, editor UI, etc.)
lib/                # utilities for helpers, hooks and other specific funtions
prisma/             # Prisma schema & client
public/             # Static assets
```

### Route Structures

![Route Structures Diagram](./public/doc/RouterStructure.jpg)

### API Overview

```text
/api/presentations
    GET  → fetch all presentations
    POST → create a new presentation

/api/presentations/:id
    GET  → get a presentation with id
    DELETE → delete a presentation with id

/api/presentations/:id/pages
    POST → create a new page in a presentation
    GET  → get a page and all its contents with id
    DELETE  → delete a page and all its contents
    PUT  → update a page and alls its contents

/api/upload
    POST → upload object to R2 Bucket

```
