This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- [React.js 18](https://reactjs.org/blog/2022/03/29/react-v18.html)
- [Next.js 13](https://nextjs.org/blog/next-12)
- [Typescript 4](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/docs/)
- [Eslint 7](https://eslint.org/docs/user-guide/getting-started)
- [Prettier 2](https://prettier.io/docs/en/index.html)
- [Husky 7](https://typicode.github.io/husky/#/)
- [Lint Staged 13](https://github.com/okonet/lint-staged)

## Usage

This project using node >= 16.14.2 & yarn

### Installation

```bash
git clone https://github.com/Zac-Zajdel/PrismaNext.git
```

```bash
yarn install
```

## Setup Prisma

Create a `.env` file and setup DATABASE_URL variable for example:

```bash
DATABASE_URL="mysql://root:password@localhost:3306/next"
```

Run the following command to create generate Schema & Migration & Seed Table

```bash
yarn prisma migrate dev --name init
```

#### Development

```bash
yarn dev
```

Reset your database to generate your own migration:

```bash
yarn prisma migrate reset
```

If you change the seeder file, you can easily run the seeder with the following:

```bash
yarn prisma db seed
```

#### Production

```bash
npm run build or yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/user](http://localhost:3000/api/user). This endpoint can be edited in `pages/api/user.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

```

```
