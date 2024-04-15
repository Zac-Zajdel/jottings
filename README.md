## Running Locally

1. Install dependencies using yarn: `yarn install`
2. Copy `.env.example` to `.env` and update the variables.
3. Start the development server: `yarn dev`

## Connecting to PlanetScale

1. Create DB branch
2. Sign in with `pscale auth login`
3. Replace `DATABASE_URL` in `.env` with Proxy port
4. Connect to branch via: `pscale connect <database-name> <branch-name> --port <port>`
5. Sync branch with local DB schema via: `yarn prisma db push`

## Generating Release Notes

1. `yarn changelog`
