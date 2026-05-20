# SHADAI Journal Home Portal

Landing page and journal management portal for SHADAI Journal.

## Project Description

This repository contains the SHADAI Journal website and portal built with the
Next.js App Router architecture. It includes:

- Public-facing landing pages
- Authentication pages
- Editorial and author dashboard modules
- Shared UI components and constants

Primary production domain: https://shadaijournal.com

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Firebase
- React Query
- Material UI (dashboard components)

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local` (API/Firebase values as
needed for your environment).

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production build locally
- `npm run lint` - run ESLint
- `npm run format` - run Prettier formatting

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Add required environment variables in Vercel project settings.
4. Trigger deployment.

After deployment, set the production domain to https://shadaijournal.com.
