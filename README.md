## Running Locally

1. Install dependencies using yarn: `yarn install`
2. Copy `.env.example` to `.env` and update the variables.
3. Start the development server: `yarn dev`

## Connecting to PlanetScale

1. Create DB branch
2. Sign in with `pscalauth login`
3. Replace `DATABASE_URL` in `.env` with Proxy port
4. Connect to branch via: `pscale connect <database-name> main --port <port>`
5. Sync branch with local DB schema


generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}

model Account {
  id                String   @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?  @db.Text
  access_token      String?  @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?  @db.Text
  session_state     String?
  createdAt         DateTime @default(now()) @map(name: "created_at")
  updatedAt         DateTime @default(now()) @map(name: "updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map(name: "accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map(name: "sessions")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now()) @map(name: "created_at")
  updatedAt     DateTime  @default(now()) @map(name: "updated_at")

  accounts    Account[]
  sessions    Session[]
  Jot         Jot[]
  JotTemplate JotTemplate[]
  Label       Label[]

  @@map(name: "users")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map(name: "verification_tokens")
}

model Jot {
  id        String   @id @default(cuid())
  authorId  String
  title     String
  content   Json?
  status    String   @default("Draft")
  priority  String?
  published Boolean  @default(false)
  createdAt DateTime @default(now()) @map(name: "created_at")
  updatedAt DateTime @default(now()) @map(name: "updated_at")

  author User    @relation(fields: [authorId], references: [id])
  labels Label[]

  @@index([authorId])
  @@map(name: "jots")
}

model JotTemplate {
  id          String   @id @default(cuid())
  authorId    String
  title       String
  content     Json?
  isPublished Boolean  @default(false) @map(name: "is_published")
  createdAt   DateTime @default(now()) @map(name: "created_at")
  updatedAt   DateTime @default(now()) @map(name: "updated_at")

  author User    @relation(fields: [authorId], references: [id])
  labels Label[]

  @@index([authorId])
  @@map(name: "jot_templates")
}

model Label {
  id          String   @id @default(cuid())
  authorId    String
  name        String
  labeledId   String
  labeledType String
  createdAt   DateTime @default(now()) @map(name: "created_at")
  updatedAt   DateTime @default(now()) @map(name: "updated_at")

  // Define a polymorphic relationship to associate labels with other tables
  author      User         @relation(fields: [authorId], references: [id])
  jot         Jot?         @relation(fields: [labeledId], references: [id], map: "posts")
  jotTemplate JotTemplate? @relation(fields: [labeledId], references: [id], map: "comments")

  @@index([authorId])
  @@index([labeledId])
  @@index([labeledType])
  @@map(name: "labels")
}
