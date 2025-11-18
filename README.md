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

npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
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

Next.js, TypeScript, Zod, PostgreSQL

### Frontend

Konva, Zustand, TailwindCSS, Shadcn

## Project Structure


